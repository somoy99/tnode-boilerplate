FROM node:10.15.0-alpine
EXPOSE 3000 9229

WORKDIR ./

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
