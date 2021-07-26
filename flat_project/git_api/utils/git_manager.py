import time
from django.conf import settings
from git import Repo


class GitManager():

    def __init__(self):
        self.repo_path = settings.GIT_REPO_PATH
        self.repo = Repo(self.repo_path)

    def get_branch_names(self):
        """
        Get all branch name of repo

        Returns:
            list with branch names
        """
        return [
            branch.name for branch in self.repo.branches
        ]

    def get_branch(self, branch_name):
        """
        Get branch of repo

        Args:
            branch_name: String with branch name

        Returns:
            Head object of the branch

        Raises:
            Exception: If branch name not in repo
        """
        assert isinstance(branch_name, str), 'branch_name must be a string'
        branch = next((
            branch for branch in self.repo.branches
            if branch.name == branch_name
        ), None)
        if branch is None:
            raise Exception(f'Branch {branch_name} not found!')
        return branch

    def get_commit(self, commit_id):
        """
        Get a commit of repo

        Args:
            commit_id: Is a string with unique hexsha of commit

        Returns:
            Commit object

        Raises:
            Exception: If commit_id not in repo
        """
        commit = next((
            commit for commit in self.repo.iter_commits()
            if commit.hexsha == commit_id
        ), None)
        if commit is None:
            raise Exception(f'Commit {commit_id} not found!')
        return commit

    def commit_detail(self, commit):
        """
        Generate a summary for commit

        Args:
            commit: A Commit object

        Returns:
            Dictionary with summary for commit.
            example:
                {
                    'id': 'eecb9e713fdd7c2c420111c2caf819448f6122a6',
                    'date': 'Fri Jul 23 01:16:51 2021',
                    'message': 'This a good message',
                    'author_name': 'Author name',
                    'author_email': 'author@email.com',
                }
        """

        files_changes = {
            diff.a_path for diff in commit.diff()
        }

        return {
            'id': commit.hexsha,
            'date': time.strftime(
                "%a %b %d %H:%M:%S %Y",
                time.gmtime(commit.committed_date)
            ),
            'message': commit.message,
            'author_name': commit.author.name,
            'author_email': commit.author.email,
            'files_change_number': len(files_changes)
        }
