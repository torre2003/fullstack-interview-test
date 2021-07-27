from .apps import WebsiteConfig
from django.urls import path
from .views import (
    BranchListView
)

app_name = WebsiteConfig.name

urlpatterns = [
    path('', BranchListView.as_view(), name='branch_list'),
]
