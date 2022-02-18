/** @jsx h */
import { h } from "preact";
import render from "preact-render-to-string";
import cors from "cors";
import fastify from "fastify";
import frameguard from "frameguard";
import middie from "middie";
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

async function createApp() {
  const app = fastify({ logger: false });
  await app.register(middie);

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

  app.get("/", async (request, reply) => {
    const props = await getRenderProps(request);
    const appHTML = render(<App {...props} />);
    const html = pageTemplate.replace(
      "#page-content",
      `<div id="root">${appHTML}</div>`
    );

    reply.header("Content-Type", "text/html");

    return html;
  });

  return app;
}

const start = async () => {
  try {
    const app = await createApp();
    await app.listen(8080);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
start();
