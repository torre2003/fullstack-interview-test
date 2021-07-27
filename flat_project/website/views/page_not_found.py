from django.views.generic import View
from django.shortcuts import render


class PageNotFoundView(View):

    def get(self, request, *args, **kwargs):
        response = render(request, 'website/page_not_found.html')
        response.status_code = 404
        return response
