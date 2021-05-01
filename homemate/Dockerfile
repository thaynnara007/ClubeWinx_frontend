FROM node:12.2.0-alpine

EXPOSE 8080

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

CMD ["yarn", "run", "start"]

COPY package.json /app

RUN yarn install --no-optional --verbose

COPY . /app