FROM debian:buster-slim
MAINTAINER github.com/adriansteffan

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y git python3.7 python3-pip curl software-properties-common libpq-dev ffmpeg
WORKDIR /srv/backend
COPY . .
#WORKDIR /srv/discord-community-soundboard/backend
RUN pip3 install -r requirements.txt
COPY config.py /srv/backend/config.py
RUN python3.7 manage.py collectstatic
RUN rm config.py
RUN chmod +x entrypoint.sh
CMD ["./entrypoint.sh"]
