#!/bin/sh

python manage.py migrate
python manage.py makemigrations api
python manage.py migrate

python manage.py collectstatic --noinput

mkdir -p data
mkdir -p media

echo '+++ Creating super user... +++'
DJANGO_SUPERUSER_USERNAME=admin DJANGO_SUPERUSER_PASSWORD=1qaz2wsx python manage.py createsuperuser --email=admin@admin.com --noinput
python manage.py migrate

gunicorn core.wsgi:application -c /etc/gunicorn/gunicorn.conf.py