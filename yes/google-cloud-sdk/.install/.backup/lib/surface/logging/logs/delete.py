# Copyright 2014 Google Inc. All Rights Reserved.
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

"""'logging sinks delete' command."""

from googlecloudsdk.api_lib.logging import util
from googlecloudsdk.calliope import base
from googlecloudsdk.calliope import exceptions
from googlecloudsdk.core import log
from googlecloudsdk.core import properties
from googlecloudsdk.core.console import console_io


class Delete(base.Command):
  """Deletes all entries from a log."""

  @staticmethod
  def Args(parser):
    """Register flags for this command."""
    parser.add_argument('log_name', help='Log name.')

  @util.HandleHttpError
  def Run(self, args):
    """This is what gets called when the user runs this command.

    Args:
      args: an argparse namespace. All the arguments that were provided to this
        command invocation.
    """
    client = self.context['logging_client_v2beta1']
    messages = self.context['logging_messages_v2beta1']
    project = properties.VALUES.core.project.Get(required=True)

    if not console_io.PromptContinue(
        'Really delete all log entries from [%s]?' % args.log_name):
      raise exceptions.ToolException('action canceled by user')

    client.projects_logs.Delete(
        messages.LoggingProjectsLogsDeleteRequest(
            projectsId=project, logsId=args.log_name))
    log.DeletedResource(args.log_name)


Delete.detailed_help = {
    'DESCRIPTION': """\
        {index}
        With no entries, the log will not appear in the list of your
        project's logs. However, you can write new entries to the log.
    """,
}