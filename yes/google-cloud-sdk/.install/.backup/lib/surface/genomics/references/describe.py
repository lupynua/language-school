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

"""Implementation of gcloud genomics references describe.
"""

from googlecloudsdk.api_lib.genomics import genomics_util
from googlecloudsdk.calliope import base


class Describe(base.DescribeCommand):
  """Returns details about a reference.
  """

  @staticmethod
  def Args(parser):
    """Register flags for this command."""
    parser.add_argument('id',
                        help='The ID of the reference to be described.')

  @genomics_util.ReraiseHttpException
  def Run(self, args):
    """This is what gets called when the user runs this command.

    Args:
      args: an argparse namespace, All the arguments that were provided to this
        command invocation.

    Returns:
      a Reference message
    """
    apitools_client = genomics_util.GetGenomicsClient()
    genomics_messages = genomics_util.GetGenomicsMessages()

    request = genomics_messages.GenomicsReferencesGetRequest(
        referenceId=args.id,
    )
    return apitools_client.references.Get(request)
