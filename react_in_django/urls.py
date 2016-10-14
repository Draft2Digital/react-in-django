from django.conf.urls import include, url
from django.views.generic.base import RedirectView
from django.contrib import admin
from sample_app.views import page1, page2, api_root, api_token, authors, author


urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', RedirectView.as_view(url='sample-app/page1', permanent=False)),
    url(r'^sample-app/page1$', page1),
    url(r'^sample-app/page2$', page2),
    url(r'^sample-app/api-root$', api_root, name='api-root'),
    url(r'^sample-app/api-token$', api_token, name='api-token'),
    url(r'^sample-app/authors$', authors, name='authors'),
    url(r'^sample-app/authors/(?P<author_id>\d{1,10})$', author, name='author'),
]
