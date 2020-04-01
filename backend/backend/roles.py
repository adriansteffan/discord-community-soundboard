from rolepermissions.roles import AbstractUserRole


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
