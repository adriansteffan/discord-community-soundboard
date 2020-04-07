# Discord Community Soundboard

A discord bot built for "enriching" your discord experience by playing custom soundclips in discord voice channels.
The main feature is a web interface that allows you to control the playback, manage users and upload custom sound clips.
The bot authenticates users via Discord using Oauth2, so the web interface is only accessible to users on the same discord servers as the bot.

As one of the bots features is uploading/playing custom mp3 files, 
I can not offer a publicly hosted version due to copyright reasons. However, you can easily set up a self hosted instance of the bot with the steps below.

(Even though the master branch holds a usable version of the bot, it is under development at the moment. A release version with a full list of features and usage explanation will be released in the future.)

## General Setup

These steps are the same for both deployment and development setups. 

#### Discord setup

* Create a bot application [here](https://discordapp.com/developers/applications/) 

* Copy the client id, client secret and the token (Add Bot > Copy Token).

* Next, head to "OAuth2" and add `YOUR_FRONTEND_URL_HERE/auth` to the redirects (`http://localhost:3000/auth` for development or something like `https://yourbotdomain.com/auth` for deployment). Then, check `identify` and `guilds`, select the redirect and copy/save the generated oauth link.

* You will also want to [add the bot to a server of yours](https://github.com/jagrosh/MusicBot/wiki/Adding-Your-Bot-To-Your-Server).

#### Config files

* Clone the repository.

* In the `frontend` directory, fill in the values in `config.js.template` and rename the file to `config.js`

* In the `backend` directory, fill in the values in `config.py.template` and rename the file to `config.py`. Generate the django secret at [djecrety](https://djecrety.ir/).

## Deployment


First of all, change the value of `POSTGRES_PASSWORD` in  `.env.template` to the password specified in `config.py`  and rename the file to `.env`

For deployment on your Linux machine, you will need both `docker` and `docker-compose`, so run your distributions equivalent of 
```
apt-get install docker docker-compose
```

To then build the docker images, run 

```
docker-compose build
```

in the root directory. This might take a while.

### Running the bot

After completing the setup, start the bot with

```
docker-compose up -d
```

and stop it with

```
docker-compose down
```

The frontend and backend will be attached to 127.0.0.1:1050 and 127.0.0.1:1051, respectively.
Use Virtualhosts (Apache) or Server Blocks (Nginx) to expose these to the outside.

### Updating

To update the bot, simply stop the running containers, run a `git pull` and build the docker files once more.

### Managing Soundclips

You will find all uploaded mp3 files in ``/var/lib/docker/volumes/discord-community-soundboard_backend-data/_data``.

If you want to manually load a lot of files into the database, place them in the folder specified above and run
```
docker-compose exec backend /bin/bash
python3.7 manage.py migrate_clips ./clips
```

from the project root.


## Development

If you want to set the bot up for local development, you will have to do some of the installation steps by hand.

### Frontend

#### Prerequisites

A recent version of [Node.js](https://nodejs.org/en/download/) is required.

#### Installation

From the `frontend` directory, run

```
npm install
```

### Running

Run the app in the development mode with

```
npm start
```
in the ```fronted``` directory.

By default, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.


### Backend


#### Prerequisites

The backend of the bot is built on Django and various python packages, so [Python 3.7](https://www.python.org/downloads/) is required.
If you are on Windows, be sure to [add Python to PATH](https://datatofish.com/add-python-to-windows-path/).

#### FFMPEG
To play sound files, the bot needs to have access to the ffmpeg library.
* Windows: Download [FFMPEG](https://ffmpeg.zeranoe.com/builds/) and place the `ffmpeg.exe` from `bin` in your backend folder.
* Linux: `apt-get install ffmpeg`

#### Installing

From the `backend` directory, run

```
pip install -r requirements.txt
```

#### Database Setup

Get [PostgreSQL 10.12](https://www.postgresql.org/download/).


In **psql**, setup a database and a user while replacing *your_password_here* with the password specified in ```config.py```:
```
CREATE DATABASE discordbotbackend;
CREATE USER discordbotuser WITH PASSWORD 'your_password_here';
ALTER ROLE discordbotuser SET client_encoding TO 'utf8';
ALTER ROLE discordbotuser SET default_transaction_isolation TO 'read committed';
ALTER ROLE discordbotuser SET timezone TO 'CET';
GRANT ALL PRIVILEGES ON DATABASE discordbotbackend TO discordbotuser;
```

Afterwards, run

```
python manage.py makemigrations
python manage.py migrate
``` 

in the ```backend``` directory to  configure the database.

 
#### Running the backend

Make sure the database service is active.
Then, start the backend with

```
python run.py
```

in the ```backend``` directory.

By default, the server will be listening on [http://localhost:8080](http://localhost:8080)

##### Managing Soundclips


If you want to manually load sound files into the database, create a `clips` folder in `backend`, place the mp3s there and run
```
python manage.py migrate_clips ./clips
```

in the `backend` directory.

## Authors

* **Adrian Steffan** - [adriansteffan](https://github.com/adriansteffan)
* **Till Mueller** - deployment setup and docker files
* **Samuel Amar** - content management rest endpoints
