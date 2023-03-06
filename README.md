# Candidate Review Tool

## Overview

This is a tool to help HR review candidates. It is a React app that uses the [Material UI](https://material-ui.com/)
library for styling. It is a single page application that pre-loads ten candidates and allows the user to repeatedly
click a button to load the next ten candidates. A candidate can be rejected or accepted with an optional comment, but
candidates without an acception or rejection do not have their comment persisted. The user also has the ability to 
"reset" the tool to its initial state, but they will receive a new list of ten candidates.

## Getting Started

### Prerequisites

- [Yarn](https://yarnpkg.com/) (v1.22.15 or higher): It is recommended to use Yarn to install dependencies and run
  scripts. This project was built using Yarn v1.22.15, but earlier versions may work.
- [Node.js](https://nodejs.org/en/) (v18.14.2 or higher): This project was built using Node v18.14.2 (LTS), but earlier
  versions may work (Yarn requires >= v16.15.0).

### Local Development

#### Running the app

1. Clone the repository.
2. Install dependencies: `yarn` or `yarn install`.
3. Start the app in development mode: `yarn start`
4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Running tests

Run `yarn test` to run the tests in watch mode.

In IntelliJ WebStorm, individual test suites or individual tests can be run by right-clicking on the test file or test
within the file, and selecting "Run".

### Building the app for production

Run `yarn build` to build the app for production to the `build` folder. This will bundle React in production mode and
optimizes the build for the best performance. The build is minified and the filenames include the hashes.
