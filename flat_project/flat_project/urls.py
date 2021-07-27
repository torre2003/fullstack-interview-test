from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('api/', include('git_api.urls')),
    path('', include('website.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
