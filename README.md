# how-fast-can-we-render
Experiment exploring performance of Node JSX rendering.

## Setup

Run `npm run build` to build ts into the dist folder in watch mode

`npm start` runs the server, manually restart it each time you make a change and need to run a benchmark.

## Benchmarking

Use [bombardier](https://github.com/codesenberg/bombardier) to benchmark, install it using
```sh
go get -u github.com/codesenberg/bombardier
```

