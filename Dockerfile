FROM node:20.2.0-alpine

WORKDIR /app

RUN apk update && \
    apk upgrade --available && \
    apk add --update python3

COPY . .

RUN npm install

RUN npm run-script build:dev

CMD ["echo" "jopa"]
