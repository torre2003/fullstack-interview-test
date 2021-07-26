from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from git_api.utils.git_manager import GitManager


class CommitTestCase(TestCase):
    """
        Testing for commit endpoints
    """
    def setUp(self):
        self.client = APIClient()
        git_manager = GitManager()
        branch = git_manager.get_branch_names()[0]
        branch_detail = git_manager.branch_detail(branch)
        self.commit_id = branch_detail['commits'][0]['id']
        self.commit = git_manager.get_commit(self.commit_id)
        self.commit_detail = git_manager.commit_detail(self.commit)

    def test_commit_detail(self):
        """
        Test integrity response for commit detail
        """
        response = self.client.get(f'/api/commits/{self.commit_id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.json(), self.commit_detail)
