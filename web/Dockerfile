FROM node:16-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache && yarn cache clean
COPY public public
COPY src src
COPY index.html vite.config.ts tsconfig*.json ./
ARG API_BASE_URL
ENV VITE_API_BASE_URL "$API_BASE_URL"
RUN yarn build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
