FROM node:16-alpine

COPY ./package*.json .
COPY ./yarn.lock .
COPY ./.* /app/

WORKDIR /app

RUN yarn install

COPY ./ /app

EXPOSE 8001
CMD ["yarn", "dev"]
