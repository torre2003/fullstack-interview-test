from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError
from git_api.models import PullRequest


class PullRequestChangeStatusSerializer(ModelSerializer):

    class Meta:

        model = PullRequest

        fields = ['status']

    def validate_status(self, value):
        if (
            self.instance.status == PullRequest.Status.OPEN and
            value not in [
                PullRequest.Status.CLOSED,
                PullRequest.Status.MERGED
            ]
        ):
            raise ValidationError(
                'New status must be {} or {}'.format(
                    PullRequest.Status.CLOSED,
                    PullRequest.Status.MERGED
                )
            )

        if (
            self.instance.status == PullRequest.Status.MERGED
        ):
            raise ValidationError("Can't change status")

        if (
            self.instance.status == PullRequest.Status.CLOSED and
            value not in [PullRequest.Status.OPEN]
        ):
            raise ValidationError(
                f'New status must be {PullRequest.Status.OPEN}'
            )

        return value
