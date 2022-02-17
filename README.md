# how-fast-can-we-render
Experiment exploring performance of Node JSX rendering.

## Setup

Run `npm run build` to build ts into the dist folder in watch mode.

Each iteration will be a seperate file named `src/vN-description.tsx`, allowing us to easily re-run previous benchmarks; such as if we want to re-compute all the values at once.

## Benchmarking

Use [bombardier](https://github.com/codesenberg/bombardier) to benchmark, install it using
```sh
go get -u github.com/codesenberg/bombardier
```
