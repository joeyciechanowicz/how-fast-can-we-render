# How fast can we render react?

We'd want to see how fast we can get a React-esk application rendering.

## Experiment setup

The focus is on the maxiumum throughput for a single Node process to render a React SSR application.

- No caching headers - this is a (pretend) stateful application, we will be relying on a CDN for caching our assets.
- Node.js - the server must be node based.
- JSX components (but not necessarily React)
- SSR, no client side JS. This doesn't mean hydration shouldn't be possible, but is out of scope for the experiment.

## Initial setup - 4728 req/s

- `React` & `react-dom/server`
- Use `renderToString` and a template in a string which has the content embedded using `template.replace(renderedHtml)`.
- Node 14

