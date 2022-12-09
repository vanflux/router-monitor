# Router Monitor
Application to monitor and control router anywhere, why not?

# Usage (development)

- Install dependencies with `yarn` command on each folder (agent, api, web)

- Place a `.env` on `api` (empty or not)

- Place a `.env` on `agent` (empty or not)

- At this point you can choose what services you want to run<br>
  You can up only a few services to run the others with `yarn start` individually:<br>
  Run `yarn up:dev:{db|agent|api|web}`<br>
  Or you can run all:<br>
  Run `yarn up:dev`
