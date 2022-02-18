import express from 'express';
import { renderToString } from 'react-dom/server';
import React from 'react';
import { App, AppProps } from './app';
import cors from 'cors';
import frameguard from 'frameguard';

const app = express();

app.use((req: any, res, next) => {
  if (req.cookies && req.cookies['auth'] !== undefined) {
    req.isLoggedIn = true;
  } else {
    req.isLoggedIn = false;
  }
  next();
});

app.use(cors());
app.use(frameguard());

const pageTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>How fast</title>
    <link rel="stylesheet" href="https://unpkg.com/mvp.css">
  </head>
  <body>
    #page-content
  </body>
</html>
`;

async function getRenderProps(req: any): Promise<AppProps> {
  return {
    isLoggedIn: req.isLoggedIn,
    path: req.path,
    showLorum: !!process.env.LORUM,
  };
}

app.get('/', (req: any, res) => {
  getRenderProps(req).then((props) => {
    const appHTML = renderToString(<App {...props} />);
    const html = pageTemplate.replace(
      '#page-content',
      `<div id="root">${appHTML}</div>`
    );

    res.contentType('text/html');
    res.status(200);

    return res.send(html);
  });
});

app.listen(8080, () => console.log('Listening on http://localhost:8080'));
