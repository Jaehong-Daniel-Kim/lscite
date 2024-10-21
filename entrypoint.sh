#!/bin/sh

# Collect statics
/app/manage.py collectstatic --noinput

# gunicorn executioin
#gunicorn --bind unix:/tmp/gunicorn.sock config.wsgi:application 

# gunicorn executioin DEV
gunicorn --bind unix:/tmp/gunicorn.sock config.wsgi:application --access-logfile /var/log/gunicorn/access.log --capture-out --log-level debug 

