from .apps import WebsiteConfig
from django.urls import path
from .views import (
    BranchListView,
    BranchDetailView,
    PageNotFoundView
)

app_name = WebsiteConfig.name

urlpatterns = [
    path('', BranchListView.as_view(), name='branch_list'),
    path('branch', BranchDetailView.as_view(), name='branch_detail'),
    path(
        '404',
        PageNotFoundView.as_view(),
        name='page_not_found'
    ),
]
