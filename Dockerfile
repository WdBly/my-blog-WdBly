FROM ohdata/php-apache:7.2.10

EXPOSE 80

RUN dpkg-reconfigure -f noninteractive tzdata &&\
    a2enmod rewrite

ADD ./server/ /var/www/

RUN cd /var/www &&\
    composer u  &&\
    chown -R www-data ./ &&\
    rm -r html &&\
    mv public/ html &&\
    php artisan config:cache &&\
    php artisan route:cache

