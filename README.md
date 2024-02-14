# VoteWatch

A simple legislative vote watch app made with Bun, Remix, React, Typescript, and
TailwindCSS. Tested with Vitest and Playwright.

## Development

Use `bun` or `npm` to install dependencies. Make sure you are using the latest stable version of Node.js (v20.11).

```bash
npm install
bun install
```

To start the app in development mode, rebuilding assets on file changes:

```sh
npm run dev
bun run dev
```

### Testing and linting

You can use the `test` script to run all the tests.

```bash
npm run test
bun run test
```

You can use the `e2e` script to run all available E2E tests with Playwright.

```bash
npm run e2e
bun run e2e
```

You can lint your code with the `lint` script, only type check the code with
the `typecheck` script, or check the formatting with the `format` script.

```bash
npm run lint
npm run typecheck
npm run format

bun run lint
bun run typecheck
bun run format
```

### Structure

This project follows a "domain" structuring, i.e., all the directories inside
the `app/` represent a domain. The only exception is the `routes` directory, which is used to define the routes in Remix. Currently, there are three business domains: `legislators`, `bills` and
`votes`. There is also the `commons` domain, which is used to group
resources and code that can be used anywhere in the application. Inside a domain
directory, there are other directories: `components`, `hooks`, `assets`, and
`mocks` which are self-explanatory in their contents.

Tests are placed right next to the code they are testing. If there is a
component file `component.tsx`, its test should be placed in the same directory
as `component.test.tsx`.

All the E2E tests are palced apart from the `app` directory, under its own
directory named `e2e`.

## Deployment

First, build the app for production:

```sh
npm run build
bun run build
```

Then run the app in production mode:

```sh
npm start
bun start
```
