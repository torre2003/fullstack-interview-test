import copy
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

from git_api.models.pull_request import PullRequest
from git_api.utils.git_manager import GitManager


class PullRequestTestCase(TestCase):
    """
        Testing for pull request endpoints
    """
    def setUp(self):
        self.client = APIClient()
        self.git_manager = GitManager()
        self.wrong_branch = 'test_branch_666'

        # Creating new branches for testing
        self.base_branch = 'test_branch_0000'
        self.compare_branch = 'test_branch_0001'
        self.git_manager.repo.create_head(self.base_branch)
        self.git_manager.repo.create_head(self.compare_branch)

        self.pull_request_data = {
            'author': 'Renato Campos',
            'title': 'Pull requests title',
            'description': 'Pull requests description',
            'base_branch': self.base_branch,
            'compare_branch': self.compare_branch
        }

    def test_create_pull_request(self):
        """
        Test integrity response for create pull request
        """
        response = self.client.post(
            '/api/pull-requests/',
            self.pull_request_data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        response_data = response.json()
        pull_request = PullRequest.objects.filter(
            id=response_data['id']
        ).first()

        # Testing data integrity
        self.assertIsNotNone(pull_request)
        self.assertEqual(pull_request.author, self.pull_request_data['author'])
        self.assertEqual(pull_request.title, self.pull_request_data['title'])
        self.assertEqual(
            pull_request.description,
            self.pull_request_data['description']
        )
        self.assertEqual(pull_request.status, PullRequest.Status.OPEN)
        self.assertEqual(
            pull_request.base_branch,
            self.pull_request_data['base_branch']
        )
        self.assertEqual(
            pull_request.compare_branch,
            self.pull_request_data['compare_branch']
        )

    def test_create_pull_request_with_wrong_branches(self):
        """
        Test response must have failed status
        """
        pull_request_data = copy.deepcopy(self.pull_request_data)
        pull_request_data.update(
            base_branch=self.base_branch,
            compare_branch=self.wrong_branch
        )
        response = self.client.post(
            '/api/pull-requests/',
            pull_request_data,
            format='json'
        )
        response_data = response.json()

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response_data['non_field_errors'][0],
            'Compare branch not found!'
        )

    def test_create_pull_request_with_equals_branches(self):
        """
        Test response must have failed status
        """
        pull_request_data = copy.deepcopy(self.pull_request_data)
        pull_request_data.update(
            base_branch=self.base_branch,
            compare_branch=self.base_branch
        )
        response = self.client.post(
            '/api/pull-requests/',
            pull_request_data,
            format='json'
        )
        response_data = response.json()
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response_data['non_field_errors'][0],
            'Both branches are equals'
        )

    def test_create_pull_request_with_wrong_initial_status(self):
        """
        Test response must have failed status
        """
        pull_request_data = copy.deepcopy(self.pull_request_data)
        pull_request_data.update(
            status=PullRequest.Status.CLOSED
        )
        response = self.client.post(
            '/api/pull-requests/',
            pull_request_data,
            format='json'
        )
        response_data = response.json()
        self.assertEqual(
            response.status_code,
            status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(
            response_data['status'][0],
            'Status must be open or merged!'
        )

    def test_change_status_pull_request(self):
        """
        Testing all combination choices of change status
        """
        change_status_tests = [
            {
                'from': PullRequest.Status.OPEN,
                'to': PullRequest.Status.MERGED,
                'response_status': status.HTTP_200_OK
            },
            {
                'from': PullRequest.Status.OPEN,
                'to': PullRequest.Status.CLOSED,
                'response_status': status.HTTP_200_OK
            },
            {
                'from': PullRequest.Status.MERGED,
                'to': PullRequest.Status.OPEN,
                'response_status': status.HTTP_400_BAD_REQUEST
            },
            {
                'from': PullRequest.Status.MERGED,
                'to': PullRequest.Status.CLOSED,
                'response_status': status.HTTP_400_BAD_REQUEST
            },
            {
                'from': PullRequest.Status.CLOSED,
                'to': PullRequest.Status.MERGED,
                'response_status': status.HTTP_400_BAD_REQUEST
            },
            {
                'from': PullRequest.Status.CLOSED,
                'to': PullRequest.Status.OPEN,
                'response_status': status.HTTP_200_OK
            },
        ]

        for change_status_test in change_status_tests:
            with self.subTest(
                from_status=change_status_test['from'],
                to_status=change_status_test['to']
            ):
                pull_request_data = copy.deepcopy(self.pull_request_data)
                pull_request_data.update(status=change_status_test['from'])
                pull_request = PullRequest.objects.create(**pull_request_data)
                change_status_data = {
                    'status': change_status_test['to']
                }
                response = self.client.patch(
                    f'/api/pull-requests/{pull_request.id}/',
                    change_status_data,
                    format='json'
                )
                self.assertEqual(
                    response.status_code,
                    change_status_test['response_status']
                )

    def tearDown(self):
        # Removing test branches
        self.git_manager.repo.delete_head(self.base_branch)
        self.git_manager.repo.delete_head(self.compare_branch)
