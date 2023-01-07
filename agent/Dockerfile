FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --network-timeout 1000000 --frozen-lockfile --no-cache && yarn cache clean
COPY tsconfig*.json ./
COPY src src
RUN yarn build
RUN rm -rf src && rm -f tsconfig*.json
CMD [ "node", "dist/index.js" ]
