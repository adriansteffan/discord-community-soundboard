FROM debian:buster-slim
MAINTAINER github.com/adriansteffan

RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -y curl software-properties-common apache2
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs
WORKDIR /srv/frontend
COPY . .
RUN npm install
RUN npm run build
RUN a2enmod rewrite
RUN sed -i 's%/var/www/html%/srv/frontend/build%g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's%ServerTokens OS%ServerTokens Prod%g' /etc/apache2/conf-available/security.conf
RUN sed -i 's%ServerSignature On%ServerSignature Off%g' /etc/apache2/conf-available/security.conf
RUN sed -i 's%<Directory /var/www/>%<Directory /srv/frontend/build/>%g' /etc/apache2/apache2.conf
RUN sed -i 's|AllowOverride None|AllowOverride All\nOptions -MultiViews\nRewriteEngine On\nRewriteCond %{REQUEST_FILENAME} !-f\nRewriteRule ^ index.html [QSA,L]|g' /etc/apache2/apache2.conf
CMD ["apachectl", "-D", "FOREGROUND"]