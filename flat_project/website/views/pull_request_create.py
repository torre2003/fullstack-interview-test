from django.views.generic import TemplateView


class PullRequestCreateView(TemplateView):

    template_name = "website/pull_request_create.html"
