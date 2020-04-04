from rest_framework.response import Response
from functools import wraps


def post_fields(key_list):
    """Decorator to check if the provided post request has all the fields required"""
    def internal_decorator(f):
        @wraps(f)
        def wrapper(request, *args, **kwds):
            if not all(k in request.data for k in key_list):
                return Response('Malformed Post Body')

            return f(request, *args, **kwds)
        return wrapper
    return internal_decorator

