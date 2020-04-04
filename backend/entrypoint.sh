#!/usr/bin/env bash

#!/bin/bash
cd /srv/discord-community-soundboard/backend
python3.7 manage.py makemigrations
python3.7 manage.py migrate
python3.7 run.py