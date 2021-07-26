from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from git_api.utils.git_manager import GitManager


class BranchDetailViewSet(ViewSet):
    """
        Retrieve detail for a Branch in git repo
    """
    def retrieve(self, request, *args, **kwargs):
        git_manager = GitManager()
        try:
            branch_detail = git_manager.branch_detail(kwargs['pk'])
            return Response(branch_detail)
        except Exception:
            return Response({
                'errors': [f'branch {kwargs["pk"]} not found']
            }, status=status.HTTP_400_BAD_REQUEST)
