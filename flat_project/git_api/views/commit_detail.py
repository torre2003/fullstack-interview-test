from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from git_api.utils.git_manager import GitManager


class CommitDetailViewSet(ViewSet):
    """
        Retrieve detail for a Commit in git repo
    """
    def retrieve(self, request, *args, **kwargs):
        git_manager = GitManager()
        try:
            commit = git_manager.get_commit(kwargs['pk'])
            commit_detail = git_manager.commit_detail(commit)
            return Response(commit_detail)
        except Exception:
            return Response({
                'errors': [f'Commit {kwargs["pk"]} not found']
            }, status=status.HTTP_400_BAD_REQUEST)
