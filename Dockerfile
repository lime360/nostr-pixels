# syntax=docker/dockerfile:1
ARG NODE_VERSION=22.2.0
FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.yarn \
    yarn install
USER node
COPY . .
EXPOSE 3000
CMD yarn start