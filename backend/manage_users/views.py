from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from backend.roles import has_permission
from rolepermissions.roles import assign_role, remove_role
from rolepermissions.checkers import has_role

import keys
from discord_bot.discord_interface.run_bot import bot
from manage_users.models import Guild
from backend.roles import default_roles
from backend.utils import post_fields

import requests

API_ENDPOINT = 'https://discordapp.com/api/v6'


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@post_fields(['user_id', 'action', 'role'])
@has_permission('edit_roles')
def edit_roles(request):
    return Response('Not implemented yet')


@api_view(['POST'])
@post_fields(['code'])
def create_access(request):

    # Get discord access token corresponding to the code by the auth
    data = {
        'client_id': keys.client_id,
        'client_secret': keys.client_secret,
        'grant_type': 'authorization_code',
        'code': request.data['code'],
        'redirect_uri': request.data['redirect_uri'],
        'scope': 'identify guilds'
    }
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    response_access = requests.post('%s/oauth2/token' % API_ENDPOINT, data=data, headers=headers)

    # Use the access token to get the guilds the user is part of
    # TODO check for missing access token
    headers = {
        "Authorization": ("Bearer " + str(response_access.json()['access_token']))
    }
    response_guilds = requests.get('%s/users/@me/guilds' % API_ENDPOINT, headers=headers)

    # A user is allowed a bot access token if he shares at least one guild with the bot
    shared_guilds = []
    bot_guild_ids = [guild.id for guild in bot.guilds]

    for guild in response_guilds.json():

        if int(guild['id']) in bot_guild_ids:

            shared_guilds.append({'id': guild['id'], 'name': guild['name']})

    if len(shared_guilds) == 0:
        # TODO include useful error message
        return Response('Some bad rejection')

    response_user = requests.get('%s/users/@me' % API_ENDPOINT, headers=headers)
    user_id = response_user.json()['id']

    # check if user exists in database, creating one if necessary
    user_query = User.objects.filter(username=user_id)
    if not user_query.exists():
        user = User.objects.create_user(username=user_id)
        for role in default_roles:
            assign_role(user, role)
    else:
        user = user_query[0]

    # caches the current guilds of a user for a login - use a real caching mechanism if deployed at large scale
    user.profile.guilds.clear()

    for guild_dict in shared_guilds:
        guild = Guild(id=guild_dict['id'], name=guild_dict['name'])
        guild.save()
        user.profile.guilds.add(guild)

    # Check if the owner role status of the user is up to date and edit it if necessary
    is_specified_as_owner = user_id in keys.bot_owners
    is_owner = has_role(user, "owner")
    if is_owner and not is_specified_as_owner:
        remove_role(user, 'owner')
    elif not is_owner and is_specified_as_owner:
        assign_role(user, 'owner')

    user.save()

    # update bot access token
    Token.objects.filter(user=user).delete()
    token = Token.objects.create(user=user)

    #  send back bot access token
    return Response(token.key)
