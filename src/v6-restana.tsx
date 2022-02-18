/** @jsx h */
import { h } from "preact";
import render from "preact-render-to-string";
import cors from "cors";
import restana from "restana";
import frameguard from "frameguard";
import http from "http";
import { App, AppProps } from "./app-preact";

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

const app = restana();

app.use(cors());
app.use(frameguard());

app.use((req: any, res: any, next: any) => {
  if (req.cookies && req.cookies["auth"] !== undefined) {
    req.isLoggedIn = true;
  } else {
    req.isLoggedIn = false;
  }
  next();
});

async function getRenderProps(req: any): Promise<AppProps> {
  return {
    isLoggedIn: req.isLoggedIn,
    path: req.path,
    showLorum: false,
  };
}

app.get("/", async (request, res) => {
  const props = await getRenderProps(request);
  const appHTML = render(<App {...props} />);
  const html = pageTemplate.replace(
    "#page-content",
    `<div id="root">${appHTML}</div>`
  );

  res.setHeader("Content-Type", "text/html");

  res.send(html);
});

http.createServer(app as any).listen(8080, "0.0.0.0", function () {
  console.log("running on http://localhost:8080");
});
