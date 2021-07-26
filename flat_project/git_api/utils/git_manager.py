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
