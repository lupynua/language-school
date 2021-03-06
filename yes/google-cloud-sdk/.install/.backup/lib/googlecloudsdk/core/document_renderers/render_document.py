# Copyright 2015 Google Inc. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Cloud SDK markdown document renderer.

This module marshals markdown renderers to convert Cloud SDK markdown to text,
HTML and manpage documents. The renderers are self-contained, allowing the
Cloud SDK runtime to generate documents on the fly for all target architectures.

The _MarkdownConverter class parses markdown from an input stream and renders it
using the Renderer class. The Renderer member functions provide an abstract
document model that matches markdown entities to the output document, e.g., font
embellishment, section headings, lists, hanging indents, text margins, tables.
There is a Renderer derived class for each output style that writes the result
on an output stream.
"""

import argparse
import sys

from googlecloudsdk.core import exceptions
from googlecloudsdk.core.document_renderers import devsite_renderer
from googlecloudsdk.core.document_renderers import html_renderer
from googlecloudsdk.core.document_renderers import man_renderer
from googlecloudsdk.core.document_renderers import markdown_renderer
from googlecloudsdk.core.document_renderers import renderer
from googlecloudsdk.core.document_renderers import text_renderer


def _GetNestedGroup(buf, i, beg, end):
  """Returns the index in buf of the end of the nested beg...end group.

  Args:
    buf: Input buffer.
    i: The buf[] index of the first beg character.
    beg: The group begin character.
    end: The group end character.

  Returns:
    The index in buf of the end of the nested beg...end group, 0 if there is
    no group.
  """
  if buf[i] != beg:
    return 0
  nesting = 0
  while i < len(buf):
    if buf[i] == beg:
      nesting += 1
    elif buf[i] == end:
      nesting -= 1
      if nesting <= 0:
        return i
    i += 1
  return 0


def _IsValidTarget(target):
  """Returns True if target is a valid anchor/link target."""
  return not any(c in target for c in ' ,()[]')


class DocumentStyleError(exceptions.Error):
  """An exception for unknown document styles."""

  def __init__(self, style):
    message = ('Unknown markdown document style [{style}] -- must be one of:'
               ' {styles}.'.format(style=style,
                                   styles=', '.join(sorted(_STYLES.keys()))))
    super(DocumentStyleError, self).__init__(message)


class _ListElementState(object):
  """List element state.

  Attributes:
    bullet: True if the current element is a bullet.
    ignore_line: The number of blank line requests to ignore.
    level: List element nesting level counting from 0.
  """

  def __init__(self):
    self.bullet = False
    self.ignore_line = 0
    self.level = 0


class _MarkdownConverter(object):
  """Reads markdown and renders to a document.

  Attributes:
    _EMPHASIS: The font emphasis attribute dict indexed by markdown character.
    _buf: The current output line.
    _code_block: Currently in a ```...``` code block.
    _depth: List nesting depth counting from 0.
    _edit: True if NOTES edits are required.
    _example: The current example indentation space count.
    _fin: The markdown input stream.
    _line: The current input line.
    _lists: _ListElementState list element state stack indexed by _depth.
    _next_example: The next example indentation space count.
    _notes: Additional text for the NOTES section.
    _paragraph: True if the last line was ``+'' paragraph at current indent.
    _next_paragraph: The next line starts a new paragraph at same indentation.
    _renderer: The document_renderer.Renderer subclass.
  """
  _EMPHASIS = {'*': renderer.BOLD, '_': renderer.ITALIC, '`': renderer.CODE}

  def __init__(self, style_renderer, fin=sys.stdin, notes=None):
    """Initializes the converter.

    Args:
      style_renderer: The document_renderer.Renderer subclass.
      fin: The markdown input stream.
      notes: Optional sentences for the NOTES section.
    """
    self._renderer = style_renderer
    self._buf = ''
    self._fin = fin
    self._notes = notes
    self._edit = self._notes
    self._lists = [_ListElementState()]
    self._code_block = False
    self._depth = 0
    self._example = 0
    self._next_example = 0
    self._paragraph = False
    self._next_paragraph = False
    self._line = None

  def _AnchorStyle1(self, buf, i):
    """Checks for link:target[text] hyperlink anchor markdown.

    Hyperlink anchors are of the form:
      <link> ':' <target> [ '[' <text> ']' ]
    For example:
      http://www.google.com[Google Search]
    The underlying renderer determines how the parts are displayed.

    Args:
      buf: Input buffer.
      i: The buf[] index of ':'.

    Returns:
      (i, back, target, text)
        i: The buf[] index just past the link, 0 if no link.
        back: The number of characters to retain before buf[i].
        target: The link target.
        text: The link text.
    """
    if i >= 3 and buf[i - 3:i] == 'ftp':
      back = 3
      target_beg = i - 3
    elif i >= 4 and buf[i - 4:i] == 'http':
      back = 4
      target_beg = i - 4
    elif i >= 4 and buf[i - 4:i] == 'link':
      back = 4
      target_beg = i + 1
    elif i >= 5 and buf[i - 5:i] == 'https':
      back = 5
      target_beg = i - 5
    elif i >= 6 and buf[i - 6:i] == 'mailto':
      back = 6
      target_beg = i - 6
    else:
      return 0, 0, None, None
    text_beg = 0
    text_end = 0
    while True:
      if i >= len(buf) or buf[i].isspace():
        # Just a link with no text.
        if buf[i - 1] == '.':
          # Drop trailing '.' that is probably a sentence-ending period.
          i -= 1
        target_end = i
        text_beg = i
        text_end = i - 1
        break
      if buf[i] == '[':
        # Explicit link text inside [...].
        target_end = i
        text_beg = i + 1
        text_end = _GetNestedGroup(buf, i, '[', ']')
        break
      if buf[i] in '{}()<>\'"`*':
        # Reject code sample or parameterized links
        break
      i += 1
    if not text_end:
      return 0, 0, None, None
    return (text_end + 1, back, buf[target_beg:target_end],
            buf[text_beg:text_end])

  def _AnchorStyle2(self, buf, i):
    """Checks for [text](target) hyperlink anchor markdown.

    Hyperlink anchors are of the form:
      '[' <text> ']' '(' <target> ')'
    For example:
      [Google Search](http://www.google.com)
      [](http://www.show.the.link)
    The underlying renderer determines how the parts are displayed.

    Args:
      buf: Input buffer.
      i: The buf[] index of ':'.

    Returns:
      (i, target, text)
        i: The buf[] index just past the link, 0 if no link.
        target: The link target.
        text: The link text.
    """
    text_beg = i + 1
    text_end = _GetNestedGroup(buf, i, '[', ']')
    if not text_end or text_end >= len(buf) - 1 or buf[text_end + 1] != '(':
      return 0, None, None
    target_beg = text_end + 2
    target_end = _GetNestedGroup(buf, target_beg - 1, '(', ')')
    if not target_end or target_end <= target_beg:
      return 0, None, None
    return (target_end + 1, buf[target_beg:target_end], buf[text_beg:text_end])

  def _Attributes(self):
    """Converts inline markdown attributes in self._buf.

    Returns:
      A string with markdown attributes converted to render properly.
    """
    # String append used on ret below because of anchor text look behind.
    emphasis = '' if self._code_block or self._example else '*_`'
    ret = ''
    if self._buf:
      buf = self._renderer.Escape(self._buf)
      self._buf = ''
      i = 0
      while i < len(buf):
        c = buf[i]
        if c == ':':
          index_after_anchor, back, target, text = self._AnchorStyle1(buf, i)
          if index_after_anchor and _IsValidTarget(target):
            ret = ret[:-back]
            i = index_after_anchor - 1
            c = self._renderer.Link(target, text)
        elif c == '[':
          index_after_anchor, target, text = self._AnchorStyle2(buf, i)
          if index_after_anchor and _IsValidTarget(target):
            i = index_after_anchor - 1
            c = self._renderer.Link(target, text)
        elif c in emphasis:
          # Treating some apparent font embelishment markdown as literal input
          # is the hairiest part of markdown. This code catches the common
          # programming clash of '*' as a literal globbing character in path
          # matching examples. It basically works for the current use cases.
          l = buf[i - 1] if i else ' '  # The char before c.
          r = buf[i + 1] if i < len(buf) - 1 else ' '  # The char after c.
          if l != '`' and c == '`' and r == '`':
            x = buf[i + 2] if i < len(buf) - 2 else ' '  # The char after r.
            if x == '`':
              # Render inline ```...``` code block enclosed literals.
              index_at_code_block_quote = buf.find('```', i + 2)
              if index_at_code_block_quote > 0:
                ret += self._renderer.Font(renderer.CODE)
                ret += buf[i + 3:index_at_code_block_quote]
                ret += self._renderer.Font(renderer.CODE)
                i = index_at_code_block_quote + 3
                continue
            else:
              # Render inline air quotes along with the enclosed literals.
              index_at_air_quote = buf.find("''", i)
              if index_at_air_quote > 0:
                index_at_air_quote += 2
                ret += buf[i:index_at_air_quote]
                i = index_at_air_quote
                continue
          if r == c:
            # Doubled markers are literal.
            c += c
            i += 1
          elif c == '*' and l in ' /' and r in ' ./' or l in ' /' and r in ' .':
            # Path-like glob patterns are literal.
            pass
          elif l.isalnum() and r.isalnum():
            # No embellishment switching in words.
            pass
          else:
            c = self._renderer.Font(self._EMPHASIS[c])
        ret += c
        i += 1
    return self._renderer.Entities(ret)

  def _Example(self, i):
    """Renders self._line[i:] as an example.

    This is a helper function for _ConvertCodeBlock() and _ConvertExample().

    Args:
      i: The current character index in self._line.
    """
    if self._line[i:]:
      self._Fill()
      if not self._example or self._example > i:
        self._example = i
      self._next_example = self._example
      self._buf = self._line[self._example:]
      self._renderer.Example(self._Attributes())

  def _Fill(self):
    """Sends self._buf to the renderer and clears self._buf."""
    if self._buf:
      self._renderer.Fill(self._Attributes())

  def _ReadLine(self):
    """Reads and possibly preprocesses the next markdown line fron self._fin.

    Returns:
      The next markdown input line.
    """
    return self._fin.readline()

  def _ConvertMarkdownToMarkdown(self):
    """Generates markdown with additonal NOTES if requested."""
    if not self._edit:
      self._renderer.Write(self._fin.read())
      return
    while True:
      line = self._ReadLine()
      if not line:
        break
      self._renderer.Write(line)
      if self._notes and line == '## NOTES\n':
        self._renderer.Write('\n' + self._notes + '\n')
        self._notes = ''
    if self._notes:
      self._renderer.Write('\n\n## NOTES\n\n' + self._notes + '\n')

  def _ConvertBlankLine(self, i):
    """Detects and converts a blank markdown line (length 0).

    Resets the indentation to the default and emits a blank line. Multiple
    blank lines are suppressed in the output.

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is a blank markdown, i otherwise.
    """
    if self._line:
      return i
    self._Fill()
    if self._lists[self._depth].bullet:
      self._renderer.List(0)
      self._depth -= 1
    if self._lists[self._depth].ignore_line:
      self._lists[self._depth].ignore_line -= 1
    if not self._depth or not self._lists[self._depth].ignore_line:
      self._renderer.Line()
    return -1

  def _ConvertParagraph(self, i):
    """Detects and converts + markdown line (length 1).

    Emits a blank line but retains the current indent.

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is a '+' markdown, i otherwise.
    """
    if len(self._line) != 1 or self._line[0] != '+':
      return i
    self._Fill()
    self._renderer.Line()
    self._next_paragraph = True
    return -1

  def _ConvertHeading(self, i):
    """Detects and converts a markdown heading line.

    = level-1 [=]
    # level-1 [#]
    == level-2 [==]
    ## level-2 [##]

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is a heading markdown, i otherwise.
    """
    start_index = i
    marker = self._line[i]
    if marker not in ('=', '#'):
      return start_index
    while i < len(self._line) and self._line[i] == marker:
      i += 1
    if i >= len(self._line) or self._line[i] != ' ':
      return start_index
    if self._line[-1] == marker:
      if (not self._line.endswith(self._line[start_index:i]) or
          self._line[-(i - start_index + 1)] != ' '):
        return start_index
      end_index = -(i - start_index + 1)
    else:
      end_index = len(self._line)
    self._Fill()
    self._buf = self._line[i + 1:end_index]
    heading = self._Attributes()
    self._renderer.Heading(i, heading)
    self._depth = 0
    if heading in ['NAME', 'SYNOPSIS']:
      while True:
        self._buf = self._ReadLine()
        if not self._buf:
          break
        self._buf = self._buf.rstrip()
        if self._buf:
          self._renderer.Synopsis(self._Attributes())
          break
    elif self._notes and heading == 'NOTES':
      self._buf = self._notes
      self._notes = None
    return -1

  def _ConvertTable(self, i):
    """Detects and converts a sequence of markdown table lines.

    This method will consume multiple input lines if the current line is a
    table heading. The table markdown sequence is:

       [...format="csv"...]
       |====*
       col-1-data-item,col-2-data-item...
         ...
       <blank line ends table>

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input lines are table markdown, i otherwise.
    """
    if (self._line[0] != '[' or self._line[-1] != ']' or
        'format="csv"' not in self._line):
      return i
    self._renderer.Table(self._line)
    delim = 2
    while True:
      self._buf = self._ReadLine()
      if not self._buf:
        break
      self._buf = self._buf.rstrip()
      if self._buf.startswith('|===='):
        delim -= 1
        if delim <= 0:
          break
      else:
        self._renderer.Table(self._Attributes())
    self._buf = ''
    self._renderer.Table(None)
    return -1

  def _ConvertIndentation(self, i):
    """Advances i past any indentation spaces.

    Args:
      i: The current character index in self._line.

    Returns:
      i after indentation spaces skipped.
    """
    while i < len(self._line) and self._line[i] == ' ':
      i += 1
    return i

  def _ConvertCodeBlock(self, i):
    """Detects and converts a ```...``` code block markdown.

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is part of a code block markdown, i otherwise.
    """
    if not i:
      return i
    if self._line[i:] == '```':
      self._code_block = not self._code_block
      return -1
    if not self._code_block:
      return i
    self._Example(i)
    return -1

  def _ConvertDefinitionList(self, i):
    """Detects and converts a definition list item markdown line.

         level-1::
         level-2:::

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is a definition list item markdown, i otherwise.
    """
    if i:
      return i
    index_at_definition_markdown = self._line.find('::')
    if index_at_definition_markdown < 0:
      return i
    level = 1
    i = index_at_definition_markdown + 2
    while i < len(self._line) and self._line[i] == ':':
      i += 1
      level += 1
    if (self._lists[self._depth].bullet or
        self._lists[self._depth].level < level):
      self._depth += 1
      if self._depth >= len(self._lists):
        self._lists.append(_ListElementState())
    else:
      while self._lists[self._depth].level > level:
        self._depth -= 1
    self._lists[self._depth].bullet = False
    self._lists[self._depth].ignore_line = 2
    self._lists[self._depth].level = level
    while i < len(self._line) and self._line[i] == ' ':
      i += 1
    self._Fill()
    self._buf = self._line[:index_at_definition_markdown]
    self._renderer.List(self._depth, self._Attributes())
    if i < len(self._line):
      self._buf += self._line[i:]
    return -1

  def _ConvertBulletList(self, i):
    """Detects and converts a bullet list item markdown line.

    The list item indicator may be '-' or '*'. nesting by multiple indicators:

        - level-1
        -- level-2
        - level-1

    or nesting by indicator indentation:

        - level-1
         - level-2
        - level-1

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is a bullet list item markdown, i otherwise.
    """
    if self._example or self._line[i] not in '-*':
      return i
    bullet = self._line[i]
    level = i / 2
    start_index = i
    while i < len(self._line) and self._line[i] == bullet:
      i += 1
      level += 1
    if i >= len(self._line) or self._line[i] != ' ':
      return start_index
    if (self._lists[self._depth].bullet and
        self._lists[self._depth].level >= level):
      while self._lists[self._depth].level > level:
        self._depth -= 1
    else:
      self._depth += 1
      if self._depth >= len(self._lists):
        self._lists.append(_ListElementState())
    self._lists[self._depth].bullet = True
    self._lists[self._depth].ignore_line = 0
    self._lists[self._depth].level = level
    self._Fill()
    self._renderer.List(self._depth)
    while i < len(self._line) and self._line[i] == ' ':
      i += 1
    self._buf += self._line[i:]
    return -1

  def _ConvertExample(self, i):
    """Detects and converts an example markdown line.

    Example lines are indented by one or more space characters.

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is is an example line markdown, i otherwise.
    """
    if not i or self._depth and not (self._example or self._paragraph):
      return i
    self._Example(i)
    return -1

  def _ConvertEndOfList(self, i):
    """Detects and converts an end of list markdown line.

    Args:
      i: The current character index in self._line.

    Returns:
      -1 if the input line is an end of list markdown, i otherwise.
    """
    if i or not self._depth:
      return i
    if self._lists[self._depth].ignore_line > 1:
      self._lists[self._depth].ignore_line -= 1
    if not self._lists[self._depth].ignore_line:
      self._Fill()
      self._renderer.List(0)
      self._depth = 0
    return i  # More conversion possible.

  def _ConvertRemainder(self, i):
    """Detects and converts any remaining markdown text.

    The input line is always consumed by this method. It should be the last
    _Convert*() method called for each input line.

    Args:
      i: The current character index in self._line.

    Returns:
      -1
    """
    self._buf += ' ' + self._line[i:]
    return -1

  def _Finish(self):
    """Flushes the fill buffer and checks for NOTES.

    A previous _ConvertHeading() will have cleared self._notes if a NOTES
    section has already been seen.
    """
    self._Fill()
    if self._notes:
      self._renderer.Line()
      self._renderer.Heading(2, 'NOTES')
      self._buf += self._notes
      self._Fill()
    self._renderer.Finish()

  def Run(self):
    """Renders the markdown from fin to out."""
    if isinstance(self._renderer, markdown_renderer.MarkdownRenderer):
      self._ConvertMarkdownToMarkdown()
      return
    while True:
      self._example = self._next_example
      self._next_example = 0
      self._paragraph = self._next_paragraph
      self._next_paragraph = False
      self._line = self._ReadLine()
      if not self._line:
        break
      self._line = self._line.rstrip()
      i = 0
      # Each _Convert*() function can:
      # - consume the markdown at self._line[i:] and return -1
      # - ignore self._line[i:] and return i
      # - change the class state, optionally advance i, and return i
      # Conversion on the current state._line stop when -1 is returned.
      for detect_and_convert in [
          self._ConvertBlankLine,
          self._ConvertParagraph,
          self._ConvertHeading,
          self._ConvertTable,
          self._ConvertIndentation,
          self._ConvertCodeBlock,
          self._ConvertDefinitionList,
          self._ConvertBulletList,
          self._ConvertExample,
          self._ConvertEndOfList,
          self._ConvertRemainder]:
        i = detect_and_convert(i)
        if i < 0:
          break
    self._Finish()


_STYLES = {'devsite': devsite_renderer.DevSiteRenderer,
           'html': html_renderer.HTMLRenderer,
           'man': man_renderer.ManRenderer,
           'markdown': markdown_renderer.MarkdownRenderer,
           'text': text_renderer.TextRenderer}


def RenderDocument(style='text', fin=None, out=None, width=80, notes=None,
                   title=None):
  """Renders markdown to a selected document style.

  Args:
    style: The rendered document style name, must be one of the _STYLES keys.
    fin: The input stream containing the markdown.
    out: The output stream for the rendered document.
    width: The page width in characters.
    notes: Optional sentences inserted in the NOTES section.
    title: The document title.

  Raises:
    DocumentStyleError: The markdown style was unknown.
  """
  if style not in _STYLES:
    raise DocumentStyleError(style)
  style_renderer = _STYLES[style](out=out or sys.stdout, title=title,
                                  width=width)
  _MarkdownConverter(style_renderer, fin=fin or sys.stdin, notes=notes).Run()


def main(argv):
  """Standalone markdown document renderer."""

  styles = sorted(_STYLES.keys())

  parser = argparse.ArgumentParser(
      description='Renders markdown on the standard input into a document on '
      'the standard output.')

  parser.add_argument(
      '--notes',
      metavar='SENTENCES',
      help='Inserts SENTENCES into the NOTES section which is created if '
      'needed.')

  parser.add_argument(
      '--style',
      metavar='STYLE',
      choices=styles,
      default='text',
      help='The output style. Must be one of {styles}. The default is '
      'text.'.format(styles=styles))

  parser.add_argument(
      '--title',
      metavar='TITLE',
      help='The document title.')

  args = parser.parse_args(argv[1:])

  RenderDocument(args.style, notes=args.notes, title=args.title)


if __name__ == '__main__':
  main(sys.argv)
