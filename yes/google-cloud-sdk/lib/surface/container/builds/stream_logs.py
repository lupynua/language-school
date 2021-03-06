# Copyright 2016 Google Inc. All Rights Reserved.
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
"""Stream-logs command."""


from googlecloudsdk.api_lib.cloudbuild import logs as cb_logs
from googlecloudsdk.api_lib.util import http_error_handler
from googlecloudsdk.calliope import base
from googlecloudsdk.core import apis as core_apis


class StreamLogs(base.Command):
  """Stream the logs for a build."""

  @staticmethod
  def Args(parser):
    """Register flags for this command.

    Args:
      parser: An argparse.ArgumentParser-like object. It is mocked out in order
          to capture some information, but behaves like an ArgumentParser.
    """
    parser.add_argument(
        'build',
        help='The build whose logs shall be streamed.',
    )

  # TODO(user,b/29048700): Until resolution of this bug, the error message
  # printed by gcloud (for 404s, eg) will not be as useful as it could be.
  @http_error_handler.HandleHttpErrors
  def Run(self, args):
    """This is what gets called when the user runs this command.

    Args:
      args: an argparse namespace. All the arguments that were provided to this
        command invocation.

    Returns:
      Some value that we want to have printed later.
    """

    client = core_apis.GetClientInstance('cloudbuild', 'v1')
    messages = core_apis.GetMessagesModule('cloudbuild', 'v1')
    registry = self.context['registry']

    build_ref = registry.Parse(
        args.build, collection='cloudbuild.projects.builds')

    cb_logs.Stream(build_ref, client, messages)
