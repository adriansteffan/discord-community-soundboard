from django.contrib.auth.views import redirect_to_login as dj_redirect_to_login
from django.core.exceptions import PermissionDenied
from django.conf import settings

from rolepermissions.checkers import has_role, has_permission
from rolepermissions.utils import user_is_authenticated

from rolepermissions.roles import AbstractUserRole

from functools import wraps


class Minimal(AbstractUserRole):
    available_permissions = {
        'play_sound_clip': True,
        'manage_playlist': True,
    }


class Basic(AbstractUserRole):
    available_permissions = {
        'play_youtube': True,
        'control_playback': True,
    }


class Uploader(AbstractUserRole):
    available_permissions = {
        'upload_sound_clip': True,
        'manage_tags': True,
        'edit_sound_clip_tags': True,
    }


class Moderator(AbstractUserRole):
    available_permissions = {
        # Moderators can assign the roles of users below moderator level - this is checked in the view
        'edit_roles': True,
        'delete_sound_clip': True,
    }


class Owner(AbstractUserRole):
    available_permissions = {
    }


default_roles = ["minimal", "basic"]


# We redefine the permission decorator to allow "Owner" users to access all functionality

def has_permission(permission_name, redirect_to_login=None):
    def request_decorator(dispatch):
        @wraps(dispatch)
        def wrapper(request, *args, **kwargs):
            user = request.user
            if user_is_authenticated(user):
                if has_permission(user, permission_name) or has_role(user, 'owner'):
                    return dispatch(request, *args, **kwargs)

            redirect = redirect_to_login
            if redirect is None:
                redirect = getattr(
                    settings, 'ROLEPERMISSIONS_REDIRECT_TO_LOGIN', False)
            if redirect:
                return dj_redirect_to_login(request.get_full_path())
            raise PermissionDenied
        return wrapper
    return request_decorator


# Decorator that checks if the user is allowed to perform the task in the guild he specified

def guild_check_decorator(f):
    @wraps(f)
    def wrapper(request, *args, **kwds):
        guild_id = request.data['guild_id']
        for guild in request.user.profile.guilds.all():
            if guild_id == str(guild.id):
                return f(request, *args, **kwds)
        raise PermissionDenied
    return wrapper
