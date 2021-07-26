from django.conf import settings
from git import Repo


class GitManager():

    def __init__(self):
        self.repo_path = settings.GIT_REPO_PATH
        self.repo = Repo(self.repo_path)
