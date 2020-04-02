from django.http import HttpResponse
from backend.roles import has_permission

def test(request):
    return HttpResponse('Hello World')
