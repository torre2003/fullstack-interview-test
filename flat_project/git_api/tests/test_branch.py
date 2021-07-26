from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from git_api.utils.git_manager import GitManager


class BranchTestCase(TestCase):
    """
        Testing for branch endpoints
    """
    def setUp(self):
        self.client = APIClient()
        git_manager = GitManager()
        self.branch_names = git_manager.get_branch_names()
        self.branch = self.branch_names[0]
        self.branch_detail = git_manager.branch_detail(self.branch)

    def test_branch_list(self):
        """
        Test integrity response for branch list
        """
        response = self.client.get('/api/branches/')
        response_branches = response.json()['branches']

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertListEqual(response_branches, self.branch_names)

    def test_branch_detail(self):
        """
        Test integrity response for branch detail
        """
        response = self.client.get(f'/api/branches/{self.branch}/')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictEqual(response.json(), self.branch_detail)
