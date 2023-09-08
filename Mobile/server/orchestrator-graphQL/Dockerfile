# syntax=docker/dockerfile:1

FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV PORT=4000
ENV HOST_USER=http://localhost:4002
ENV HOST_MAIN_ENTITY=http://localhost:4001
ENV REDIS_PORT=
ENV REDIS_HOST=
ENV REDIS_USERNAME=
ENV REDIS_PASSWORD=

WORKDIR /orchestrator-graphQL

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["node", "app.js"]