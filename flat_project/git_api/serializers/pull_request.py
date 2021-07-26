from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import ValidationError
from git_api.models import PullRequest
from git_api.utils.git_manager import GitManager


class PullRequestSerializer(ModelSerializer):

    class Meta:

        model = PullRequest

        fields = '__all__'

    def validate_status(self, value):
        if value not in [
            PullRequest.Status.OPEN,
            PullRequest.Status.MERGED,
        ]:
            raise ValidationError('Status must be open or merged!')
        return value

    def validate(self, data):
        """
        Check if branches exists in repo and not equals
        """
        git_manager = GitManager()
        branch_list = git_manager.get_branch_names()
        if data['base_branch'] not in branch_list:
            raise ValidationError('Base branch not found!')
        if data['compare_branch'] not in branch_list:
            raise ValidationError('Compare branch not found!')
        if data['base_branch'] == data['compare_branch']:
            raise ValidationError("Both branches are equals")
        return data
