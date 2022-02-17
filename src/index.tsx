import express from "express";
import { renderToString, renderToNodeStream } from "react-dom/server";
import React from "react";
import { App } from "./app";

const app = express();

const pageTemplateHeader = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>How fast</title>
  </head>
  <body>`;

const pageTemplateFooter = `
  </body>
</html>
`;

app.get("/", (req, res) => {
  const appHTML = renderToString(<App />);
  res.contentType("text/html");
  res.status(200);

  return res.send(pageTemplateHeader + appHTML + pageTemplateFooter);
});

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
