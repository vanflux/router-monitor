<h1 align="center">
  Router Monitor <img src="./docs/images/logo.svg" />
</h1>

<p align="center">
An application to monitor and control routers anywhere, why not???
</p>

<p align="center">
  <img src="https://img.shields.io/docker/v/vanflux/rm-agent?color=%23bbbb00&label=vanflux%2Frm-agent" />
  <img src="https://img.shields.io/docker/v/vanflux/rm-api?color=%23cc00cc&label=vanflux%2Frm-api" />
  <img src="https://img.shields.io/docker/v/vanflux/rm-web?color=%2300cccc&label=vanflux%2Frm-web" />
</p>

<p align="center">
  <img src="https://img.shields.io/docker/image-size/vanflux/rm-agent?color=%23bbbb00&label=vanflux%2Frm-agent" />
  <img src="https://img.shields.io/docker/image-size/vanflux/rm-api?color=%23cc00cc&label=vanflux%2Frm-api" />
  <img src="https://img.shields.io/docker/image-size/vanflux/rm-web?color=%2300cccc&label=vanflux%2Frm-web" />
</p>

# Applications

- Agent: Application that interacts with the Api and your router to get wifi clients and apply restrictions to it.
- Api: Server that provide all possible actions to agents and admin users through Web.
- Web: Dashboard for admin users manage routers.

# Routers Support

Sorry I don't have all routers, just one, an Arris Router.
If you want to add support for your router, reverse engineer the admin page and implement functions on `agent/src/routers` that retrieve client list and block or unblock mac addresses.

# Web

## Wifi Clients Report

![](./docs/images/web-home.png)

## Schedules

![](./docs/images/web-schedules-modal.png)

# Api

Start and visit [http://127.0.0.1:3000/api](http://127.0.0.1:3000/api) route for documentation

![](./docs/images/api-swagger.png)

# Agent

![](./docs/images/agent-terminal.png)

# Usage

Requirement:
- Docker
- Docker-compose

Normally `db+api+web` is separated from `agent`, you can have multiple agents running on different locations.

- docker-compose.yml:
  ```yml
  version: '3.1'

  services:
    mongo:
      image: mongo
      environment:
        MONGO_INITDB_ROOT_USERNAME: user
        MONGO_INITDB_ROOT_PASSWORD: pass

    rm-api:
      image: vanflux/rm-api
      ports:
        - 3000:3000
      environment:
        DB_URI: mongodb://user:pass@mongo:27017
        JWT_SECRET: jwt-secret
        ADMIN_USER: admin
        ADMIN_PASS: admin

    rm-web:
      image: vanflux/rm-web
      ports:
        - 80:80
      environment:
        API_BASE_URL: http://localhost:3000/api

    rm-agent:
      image: vanflux/rm-agent
      environment:
        ROUTER_TYPE: simulated
        ROUTER_URL: http://192.168.0.1
        ROUTER_ADMIN_USER: admin
        ROUTER_ADMIN_PASS: password
        AGENT_ID: agent-id
        AGENT_SECRET: agent-secret
        COORDINATOR_URL: http://rm-api:3000/api
        WIFI_CLIENTS_REPORT_INTERVAL: 30
        CLIENT_RESTRICTION_INTERVAL: 30
  ```

# Usage (development)

- Install dependencies with `yarn` command on each folder (agent, api, web)
- Run `yarn setup-env` to setup .env's
- Run `yarn up:dev:db` to start database
- If you want to start the Agent, go to `agent` and run `yarn start`
- If you want to start the Api, go to `api` and run `yarn start`
- If you want to start the Web, go to `web` and run `yarn start`
- If you want to start everything on docker, just run `yarn up:dev`
