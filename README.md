## Intro

This repository is the SeattleKink.com website

It is built using Next, and build to a static /out folder. This folder is deployed using CloudFlare Static Pages for SeattleKink.com -- So /out is literally the homepage, serving /index.html files (etc)

You should read up on Next App Router for how the pages work (/src/app)

Since this repo is statically build and deployed, updates will only occur on the webpage after:
1. Changes to `main` branches occur
2. CloudFlare sees this commit and builds the release for us -OR- Raven pushes the changes manually

## Getting Started

### Prereqs
- Bun.js: https://bun.com/docs/installation
- Node 24
```
bun add -g nvm
nvm install $(cat .nvmrc)
nvm use
```

### Install App Reqs
```bash
bun install
```

### Run Dev
```bash
bun dev
```

The terminal will eventually show you the local URL to load (usually localhost:3000)

### Publishing changes
1. Fork this repo to your own Github account
2. Make pull requests from your `main` branch to ours
3. Ping Raven to approve your pull request (may not see the email notif)

If you plan on being a consistent part of this repo, talk to @tehraven about being a moderator of the codebase itself so we can move faster together