ARG NODE_VERSION=21.7.1
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /src
ADD package.json /src
RUN npm i --silent
ADD . /src
RUN mkdir /src/build

