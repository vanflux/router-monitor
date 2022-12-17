FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache && yarn cache clean
COPY nest-cli.json tsconfig*.json ./
COPY src src
RUN yarn build
RUN rm -rf src && rm -f tsconfig*.json
CMD [ "node", "dist/main.js" ]
