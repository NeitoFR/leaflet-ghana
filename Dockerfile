FROM node:8.11.4

ADD ./app/dist /app/dist

ADD ./app/server /app/server

ADD ./app/package.json /app/package.json

ENV http_proxy=http://PITC-Zscaler-EMEA-Amsterdam3PR.proxy.corporate.ge.com:80

ENV https_proxy=http://PITC-Zscaler-EMEA-Amsterdam3PR.proxy.corporate.ge.com:80

EXPOSE 80

WORKDIR /app

RUN npm i

CMD npm run prod