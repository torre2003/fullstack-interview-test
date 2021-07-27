from django.db import models


class PullRequest(models.Model):
    """
        His model save information for the petition
        of incorporate changes in base branch
    """
    class Status(models.TextChoices):
        OPEN = 'open', 'Open'
        CLOSED = 'closed', 'Closed'
        MERGED = 'merged', 'Merged'

    author = models.CharField(
        max_length=150,
        null=False,
        blank=False
    )
    title = models.CharField(
        max_length=150,
        null=False
    )
    description = models.TextField(
        null=False,
        default=''
    )
    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.OPEN
    )
    base_branch = models.CharField(
        max_length=200,
        null=False,
        default=''
    )
    compare_branch = models.CharField(
        max_length=200,
        null=False,
        default=''
    )
