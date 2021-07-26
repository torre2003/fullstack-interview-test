from rest_framework.generics import ListCreateAPIView
from rest_framework import filters
from git_api.models import PullRequest
from git_api.serializers import PullRequestSerializer


class PullRequestListApiView(ListCreateAPIView):

    queryset = PullRequest.objects.all()

    serializer_class = PullRequestSerializer

    filter_backends = [filters.OrderingFilter]

    ordering = ['-id']
