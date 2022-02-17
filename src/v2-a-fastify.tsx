const fastify = require("fastify");
import { renderToString } from "react-dom/server";
import React from "react";
import { App } from "./app";

const app = fastify({ logger: false });

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>How fast</title>
  </head>
  <body>
    #page-content
  </body>
</html>
`;

app.get("/", (request: any, reply: any) => {
  const appHTML = renderToString(<App />);
  const html = pageTemplate.replace(
    "#page-content",
    `<div id="root">${appHTML}</div>`
  );

  reply.header("Content-Type", "text/html");

  return html;
});

const start = async () => {
  try {
    await app.listen(8080);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
