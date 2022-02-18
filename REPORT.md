# How fast can we render react?

We'd want to see how fast we can get a React-esk application rendering.

## Experiment setup

The focus is on the maxiumum throughput for a single Node process to render a React SSR application.

- No caching headers - this is a (pretend) stateful application, we will be relying on a CDN for caching our assets.
- Node.js - the server must be node based.
- JSX components (but not necessarily React)
- SSR, no client side JS. This doesn't mean hydration shouldn't be possible, but is out of scope for the experiment.

## v1 Initial setup - 277 req/s | 3,692 req/s

- `React` & `react-dom/server`
- Use `renderToString` and a template in a string which has the content embedded using `template.replace(renderedHtml)`.
- Node 17.5

Lotsa lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec       448.40      39.18     842.70
  Latency      277.35ms    22.29ms   543.14ms
Throughput:    26.19MB/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec      3692.43     334.50    4206.42
  Latency       33.82ms     2.31ms    80.14ms
Throughput:     3.00MB/s

## v2 renderToNodeStream 452 req/s | 3,738 req/s

Statistics        Avg      Stdev        Max
  Reqs/sec       452.49      46.65    1394.12
  Latency      275.10ms    22.73ms   545.11ms
Throughput:    26.39MB/s

Statistics        Avg      Stdev        Max
  Reqs/sec      3738.20     437.81    4306.37
  Latency       33.41ms     4.25ms   178.85ms
Throughput:     2.87MB/s

## v3 Fastify 478 req/s | 7,044 req/s

Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec       478.01      40.68     558.18
  Latency      259.97ms    21.58ms   607.65ms
Throughput:    27.90MB/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec      7044.27     997.39    7919.25
  Latency       17.73ms     3.80ms   116.33ms
Throughput:     5.18MB/s

## v4 Preact 2,108 req/s | 17,532 req/s

Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec      2108.56     197.20    2408.13
  Latency       59.21ms     3.92ms   133.21ms
Throughput:   123.04MB/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec     17532.99     895.07   18907.87
  Latency        7.13ms   368.07us    30.31ms
Throughput:    12.34MB/s

## v5 Solid 2,497 req/s | 16,139 req/s

Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec      2497.38     270.86    2945.63
  Latency       50.04ms     3.46ms   233.27ms
Throughput:   161.32MB/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec     16139.19    1343.48   18276.36
  Latency        7.74ms   557.58us    38.09ms
Throughput:    16.02MB/s

## v6 Restana 2,057 req/s | 18,409 req/s

Lorum
Statistics        Avg      Stdev        Max
  Reqs/sec      2055.94     391.21    2457.33
  Latency       60.69ms    20.85ms   428.00ms
Throughput:   119.96MB/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec     18409.76    1073.73   20289.03
  Latency        6.79ms     6.22ms   319.57ms
Throughput:    12.96MB/s

## v7 Restana 2,057 req/s | 16,304 req/s

No Lorum:
Statistics        Avg      Stdev        Max
  Reqs/sec     16304.07    2392.66   19854.93
  Latency        7.67ms     1.37ms    71.24ms
Throughput:    11.35MB/s

