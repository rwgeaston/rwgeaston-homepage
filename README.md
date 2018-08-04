to setup:

clone this into ~/frontend

install some npm and react stuff and do npm install/npm run build

clone https://github.com/rwgeaston/mario-stats-django into ~/django and make a django virtualenv and install requirements

put cv.pdf in ~/files

nginx.conf should be put in nginx sites-available, probably with another name

symlink it to sites-enabled and then do nginx -t and nginx -s reload

gunicorn.service belongs at /etc/systemd/system/gunicorn.service

i think i followed setup instructions from [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-django-with-postgres-nginx-and-gunicorn-on-ubuntu-16-04) for gunicorn service setup  and postgres

i am sure more instructions are needed for this but i need to do it again from scratch to remember what
