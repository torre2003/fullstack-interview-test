from django.urls import path
from git_api.apps import GitApiConfig
from .views import (
    BranchDetailViewSet,
    BranchListViewSet
)

app_name = GitApiConfig.name

urlpatterns = [
    path(
        'branches/',
        BranchListViewSet.as_view({'get': 'list'}),
        name='branch_list'
    ),
    path(
        'branches/<str:pk>/',
        BranchDetailViewSet.as_view({'get': 'retrieve'}),
        name='branch_detail'
     ),
]
