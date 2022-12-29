FROM node:16-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache && yarn cache clean
COPY public public
COPY src src
COPY index.html vite.config.ts tsconfig*.json ./
ARG VERSION
ENV VERSION $VERSION
RUN yarn build

FROM nginx:alpine
COPY nginx-gen-env.sh /docker-entrypoint.d
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
