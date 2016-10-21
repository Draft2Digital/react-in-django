from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.contrib import admin
from sample_app import views


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='sample-app/page1', permanent=False)),
    url(r'^sample-app/page1$', views.page1),
    url(r'^sample-app/page2$', views.page2),
    url(r'^sample-app/api-root$', views.api_root, name='api-root'),
    url(r'^sample-app/api-token$', views.api_token, name='api-token'),
    url(r'^sample-app/authors$', views.authors, name='authors'),
    url(r'^sample-app/authors/(?P<author_id>\d{1,10})$', views.author, name='author'),
]
