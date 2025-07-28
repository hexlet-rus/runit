# FROM node:23


# RUN apt update && apt install -y make curl

# ENV DOCKER_CHANNEL stable
# ENV DOCKER_VERSION 20.10.21

# WORKDIR /usr/src/runit

# COPY . .

# RUN make setup

# CMD [ "make", "start" ]
