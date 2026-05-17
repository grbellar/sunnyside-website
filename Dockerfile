# syntax=docker/dockerfile:1.7

FROM caddy:2-alpine

WORKDIR /srv

COPY index.html styles.css script.js favicon.svg ./

RUN printf ':80 {\n\troot * /srv\n\tfile_server\n}\n' > /etc/caddy/Caddyfile

EXPOSE 80
