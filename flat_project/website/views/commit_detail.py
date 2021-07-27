from django.views.generic import TemplateView


class CommitDetailView(TemplateView):

    template_name = "website/commit_detail.html"
