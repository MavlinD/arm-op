#FROM composer:latest AS composer
FROM php:5-fpm
# 2019-08-29 ---------------
#COPY --from=composer /usr/bin/composer /usr/bin/composer
#RUN composer --version && php --v
#WORKDIR /app
#https://www.hostinger.ru/rukovodstva/kak-ustanovit-composer
#RUN "composer install"
# 2019-08-29 ---------------

ARG http_proxy
ENV http_proxy=$http_proxy
#ENV COMPOSER_ALLOW_SUPERUSER 1

ARG no_proxy
ENV no_proxy=$no_proxy

RUN apt-get update
# 2019-08-29 ---------------
RUN apt-get install -y \
        libzip-dev \
        zip \
        libssl-dev \
        libc-client-dev \
        libkrb5-dev \
  # && docker-php-ext-configure zip --with-libzip \
  && docker-php-ext-install zip 
  # && docker-php-ext-configure imap --with-kerberos --with-imap-ssl \
  # && docker-php-ext-install -j$(nproc) imap
#RUN apt-get install -y php7.2-curl php7.2-json php7.2-cgi php7.2-xsl php7.2-zip
#RUN docker-php-ext-install php7.2-curl php7.2-json php7.2-cgi php7.2-xsl php7.2-zip
#RUN docker-php-ext-install xsl
#RUN curl -sS https://getcomposer.org/installer | \
#    php -- --install-dir=/usr/bin/ --filename=composer

#WORKDIR /app
#COPY . ./
#RUN composer install --no-dev --no-interaction -o


# 2019-08-29 ---------------
RUN docker-php-ext-install pdo pdo_mysql mysqli

#RUN apt-get install -y libc-client-dev libkrb5-dev && rm -r /var/lib/apt/lists/*
# Install and enable ldap
# RUN apt-get install libldap2-dev -y
# RUN docker-php-ext-install ldap

#RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl && docker-php-ext-install imap
#RUN docker-php-ext-configure imap --with-kerberos --with-imap-ssl
# Install and enable xDebug
RUN pear config-set http_proxy $http_proxy
RUN pecl install xdebug-2.3.3
RUN docker-php-ext-enable xdebug
# 2019-08-29 ---------------


# 2019-08-29 ---------------
# Prevent error in nginx error.log
RUN touch /var/log/xdebug_remote.log
RUN chmod 777 /var/log/xdebug_remote.log

# Xdebug setup
#RUN echo "zend_extension=/usr/local/lib/php/extensions/no-debug-non-zts-20151012/xdebug.so" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.remote_enable=on" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_autostart=true" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_handler=dbgp" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_mode=req" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_port=9000" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_log=/var/log/xdebug_remote.log" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.idekey=phpstorm" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.remote_connect_back=Off" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    # docker nginx ip adress
    && echo "xdebug.remote_host=172.17.0.1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

## Copy php.ini into image
#COPY php.ini.sample /usr/local/etc/php/php.ini

# 2019-08-29 ---------------
#COPY --from=composer /usr/bin/composer /usr/bin/composer
#RUN composer --version && php --v
#WORKDIR /app
#RUN "composer install"

#RUN curl https://icanhazip.com

#COPY ./composer.* /app/
#RUN set -xe \
#    && composer install --no-interaction --no-ansi --no-suggest --prefer-dist  \
#        --no-autoloader --no-scripts \
#    && composer install --no-dev --no-interaction --no-ansi --no-suggest \
#        --prefer-dist --no-autoloader --no-scripts

#RUN curl -sS https://getcomposer.org/installer | php

#RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
#RUN php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
#RUN php composer-setup.php
#RUN php -r "unlink('composer-setup.php');"
#RUN composer install
#COPY composer.json composer.json
#COPY composer.lock composer.lock
#RUN composer install --prefer-dist --no-scripts --no-dev --no-autoloader && rm -rf /root/.composer

## Install composer
#RUN curl -sS https://getcomposer.org/installer | php
#RUN mv composer.phar /usr/local/bin/composer

## Add composer bin to PATH
#ENV PATH "$PATH:$HOME/.composer/vendor/bin"
# 2019-08-29 ---------------


