# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

import json

from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from sample_app import models


########################################################################
def page1(request):
    return render(request, "author/page1.html")


########################################################################
def page2(request):
    return render(request, "author/page2.html")


########################################################################
def api_root(request):
    content = """\
    {
        "authors": "/sample-app/authors"
    }
    """
    return HttpResponse(content, content_type="text/json")


########################################################################
def api_token(request):
    return HttpResponse("notimplemented", content_type="text/json")


########################################################################
@csrf_exempt
def authors(request):
    if request.method == "GET":
        content = json.dumps(list(models.Author.objects.all().values()))
        print("content:")
        print(content)
        return HttpResponse(content, content_type="text/json")
    elif request.method == "POST":
        print("incoming content")
        print(request.body)
        data = json.loads(request.body)
        new_author = models.Author.objects.create(first_name=data["first_name"],
                                                  last_name=data["last_name"],
                                                  description=data["description"])
        # Return the new id
        content = json.dumps({"id": new_author.id})
        return HttpResponse(content, content_type="text/json")
    else:
        print("A DIFFERENT request:", request.method)
        print("A DIFFERENT request:", request.body)


########################################################################
@csrf_exempt
def author(request, author_id):
    if request.method == "GET":
        an_author = models.Author.objects.filter(id=author_id).values().first()
        if an_author:
            content = json.dumps(an_author)
            print("content:")
            print(content)
            return HttpResponse(content, content_type="text/json")
        else:
            return HttpResponse("not found", content_type="text/plain", status=404)
    elif request.method == "POST":
        print("POST author:", author_id)
        print(request.body)
    elif request.method == "DELETE":
        print("DELETE author:", author_id)
        models.Author.objects.filter(id=author_id).delete()
        return HttpResponse("ok", content_type="text/plain", status=200)
    else:
        print("A DIFFERENT request:", request.method)
        print("A DIFFERENT request:", request.body)
