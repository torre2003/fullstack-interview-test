from django.views.generic import TemplateView


class BranchDetailView(TemplateView):

    template_name = "website/branch_detail.html"
