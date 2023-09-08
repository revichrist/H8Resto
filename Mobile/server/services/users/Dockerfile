# syntax=docker/dockerfile:1

FROM node:lts-hydrogen

ENV NODE_ENV=production
ENV PORT=4001
ENV MONGO_URI=

WORKDIR /user

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["node", "app.js"]