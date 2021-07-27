from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin, UpdateModelMixin

from git_api.models import PullRequest
from git_api.serializers import (
    PullRequestSerializer,
    PullRequestChangeStatusSerializer
)


class PullRequestDetailApiView(
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericAPIView
):

    queryset = PullRequest.objects.all()

    serializer_class = {
        'GET': PullRequestSerializer,
        'PATCH': PullRequestChangeStatusSerializer,
    }

    def get_serializer_class(self):
        return self.serializer_class[self.request.method]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
