# Discord Community Soundboard

A discord bot built for "enriching" your discord experience playing custom soundclips -
The main feature is a web interface that allows you to control the bot, manage users and upload custom sound clips.
The web interface is only accessible to members on the same discord server as the bot.


# Getting Started

To self-host/develop the bot, you will need to create a bot application [here](https://discordapp.com/developers/applications/) 

Copy the client id, client secret and the token (Add Bot > Copy Token).

Next, head to "OAuth2" and add `YOUR_FRONTEND_URL_HERE/auth` to the redirects (e.g. `http://localhost:3000/auth` for development). Then, check `identify` and `guilds` and copy/save the generated auth link.

You may also want to [add the bot to a server of yours](https://github.com/jagrosh/MusicBot/wiki/Adding-Your-Bot-To-Your-Server).


## Fontend


### Prerequisites

A recent version of [Node.js](https://nodejs.org/en/download/) is required.


### Installing
From the project root, run the following

```
cd frontend
npm install
```

In the ```src``` directory, create a ```config.js``` with the following structure:

```
var config = {};


config.backendUrl = "YOUR_BACKEND_URL_HERE"; // use http://localhost:8080 for development
config.frontendUrl = "YOUR_FRONTEND_URL_HERE"; // use http://localhost:3000 for development

config.oauthUrl = "YOUR_OAUTH_LINK"

export default configure;

```

Fill in the urls at which frontend and backend can be reached and insert the previously generated auth link.


### Running

Run the app in the development mode with

```
npm start
```
in the ```fronted``` directory.

By default, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

## Deployment

To build the react app, run
```
npm run build
```

in the ```fronted``` directory.

!TODO: Webserver

## Backend



### Prerequisites

The backend of the bot is built on Django and various python packages, so [Python 3.7](https://www.python.org/downloads/) is required.
If you are on Windows, be sure to [add Python to PATH](https://datatofish.com/add-python-to-windows-path/).

### Installing

From the project root, run the following

```
cd backend
pip install -r requirements.txt
manage.py collectstatic
```


#### Next, you will need to configure secret keys for the project:

In the ```backend``` folder, create a ```keys.py``` with the following structure:

```
bot_token = "YOUR_BOT_TOKEN_HERE"
client_id = "YOUR_CLIENT_ID_HERE"
client_secret = "YOUR_CLIENT_SECRET_HERE"

django_secret_key = "YOUR_SECRET_KEY_HERE"

database_password = "your_password_here"

bot_owners = ["your_discord_account_id_here"]
```

Put in the discord application token, client id and client secret.

For the secret key, create one with [djecrety](https://djecrety.ir/).

The database password will be used by the django app to access the database, use a strong password of your own. 

bot_owners is a list of users that have access to all functionality of the bot by default and are able to create moderators. 

#### Database Setup

Get [PostgreSQL 10.12](https://www.postgresql.org/download/).


In **psql**, setup a database and a user while replacing *your_password_here* with the password specified in ```keys.py```:
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

 
### Running the bot

Make sure the database service is active.
Then, start the backend with

```
python run.py
```

in the ```backend``` directory.

By default, the server will be listening on [http://localhost:8080](http://localhost:8080)


TODO usage e.g. python manage.py migrate_clips /path/

## Authors

* **Adrian Steffan** - [adriansteffan](https://github.com/adriansteffan)

