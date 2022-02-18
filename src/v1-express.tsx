import express from "express";
import { renderToString } from "react-dom/server";
import React from "react";
import { App } from "./app";

const app = express();

app.use((req, res, next) => {
  if (req.cookies["auth"] !== undefined) {
    req.isLoggedIn = true;
  } else {
    req.isLoggedIn = false;
  }
  next();
});

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

app.get("/", (req, res) => {
  const appHTML = renderToString(<App isLoggedIn={req.isLoggedIn} />);
  const html = pageTemplate.replace(
    "#page-content",
    `<div id="root">${appHTML}</div>`
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(html);
});

app.listen(8080, () => console.log("Listening on http://localhost:8080"));
