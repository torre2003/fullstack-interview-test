from django.urls import path
from git_api.apps import GitApiConfig
from .views import (
    BranchDetailViewSet,
    BranchListViewSet,
    CommitDetailViewSet
)

app_name = GitApiConfig.name

urlpatterns = [
    path(
        'branches/',
        BranchListViewSet.as_view({'get': 'list'}),
        name='branch_list'
    ),
    path(
        'branches/<path:pk>/',
        BranchDetailViewSet.as_view({'get': 'retrieve'}),
        name='branch_detail'
     ),
    path(
        'commits/<str:pk>/',
        CommitDetailViewSet.as_view({'get': 'retrieve'}),
        name='commit_detail'
    ),
]
