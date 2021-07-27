from django.views.generic import TemplateView


class BranchListView(TemplateView):

    template_name = "website/branch_list.html"
