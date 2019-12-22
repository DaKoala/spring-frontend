# Spring
This is the front-end part of the Spring project. This project is a course project of the course *Software Engineering* offered in 2019 Fall Semester in NYU Shanghai.

## Tech Stack

Framework: TypeScript + React

Stylesheet: Less

State management: Mobx

Bundler: Webpack

Test: Jest(unit test) + Puppeteer(e2e test)

Package manager: yarn

## Installation

Before start, some packages are required to be installed globally:

* [Node.js](https://nodejs.org/en/) (LTS version)
* [yarn](https://yarnpkg.com/en/docs/install)

### Download

```bash
git clone https://github.com/DaKoala/spring-frontend.git
cd spring-frontend
yarn # Install dependencies
```

### Compiles and hot-reloads for development

```bash
yarn dev
```

### Compiles and minifies for production

```bash
yarn build
```

### Lint and auto fix TypeScript files

```bash
yarn lint
```

### Remove all dependencies

```bash
yarn clean
```

## File structure

* `index.tsx` Main entrance of the project
* `App.tsx` The root component
* `assets` Static files (images, audio files, video files)
* `biz-components` Business components (These components have the business logic integrated and can use the global store)
* `components` General components (These components do not require specific context and cannot use the global store)
* `pages` Page components (These components each corresponds to a route)
* `constants` Global constants such as `type` , `enum` , `interface` and other constant variables
* `service` Functions sending requests and parsing responses
* `stores` Global store to manage state, powered by [Mobx](https://mobx.js.org/)
* `styles` Reusable stylesheets
* `test` Test scripts
* `types` Global TypeScript type declaration
* `utils` Utility functions
* `email` Email template HTML file

## License
[GPL-3.0](./LICENSE)
