![screenshot](https://raw.githubusercontent.com/cedricblondeau/nhl-cli-dashboard/master/screenshot.jpg)

# NHL CLI Dashboard

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/kinda-sfw.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

## Run it in `docker` 🐳

**Pull it from Docker Hub:**

```bash
docker pull cedricbl/nhl-cli-dashboard && \
docker run -ti -e TZ=America/Toronto -e TERM=xterm-256color cedricbl/nhl-cli-dashboard
```

Replace `America/Toronto` with your actual timezone. This image is for `amd64` arch only.

**Or build it:**

Want to build this image from a `Dockerfile` instead? Or do you want to run this dashboard on a non-`amd64` arch, let's say `arm`? On a Raspberry Pi?

```
docker build -t cedricbl/nhl-cli-dashboard github.com/cedricblondeau/cedricbl/nhl-cli-dashboard && \
docker run -ti -e TZ=America/Toronto -e TERM=xterm-256color cedricbl/nhl-cli-dashboard
```

## Install using `npm` or `yarn`

**NPM:**
```bash
npm install -g nhl-cli-dashboard
```

**Yarn:**
```bash
yarn global add nhl-cli-dashboard
```

Requires NodeJS 6+.

## Usage

```bash
nhl-cli-dashboard
```

- Use ⬅️  and ➡️  keys to navigate through different different matches.

## How does it work?

Data is sourced from the undocumented NHL Stats API. Matches get updated on every minutes.

Terminal interface built with [react-blessed](https://github.com/Yomguithereal/react-blessed). Inspired by [world-cup-2018-cli-dashboard](
https://github.com/cedricblondeau/world-cup-2018-cli-dashboard).

## FAQ

#### Q: Data is not showing up?

If an API call fails, we log a debug message. Press `F12` to see the debug console, some helpful messages may show up (a 503 or a 429 HTTP code for instance).

## Development

```bash
git clone https://github.com/cedricblondeau/nhl-cli-dashboard
cd nhl-cli-dashboard
yarn install
yarn start
```

Contributions are very welcome.

## LICENSE

MIT
