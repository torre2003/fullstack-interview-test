from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from git_api.utils.git_manager import GitManager


class BranchListViewSet(ViewSet):
    """
        Name list of branches in git repo
    """
    def list(self, request, *args, **kwargs):
        git_manager = GitManager()
        branch_names = git_manager.get_branch_names()
        return Response({
            'branches': branch_names
        })
