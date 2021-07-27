from django.views.generic import TemplateView


class PullRequestListView(TemplateView):

    template_name = "website/pull_request_list.html"
