import cors from 'cors';
import fastify from 'fastify';
import frameguard from 'frameguard';
import middie from 'middie';
import { renderToString } from 'solid-js/web';
import { App } from './app-solid/index';

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

  app.use((req, res, next) => {
    if (req.cookies && req.cookies['auth'] !== undefined) {
      req.isLoggedIn = true;
    } else {
      req.isLoggedIn = false;
    }
    next();
  });

  async function getRenderProps(req) {
    return {
      isLoggedIn: req.isLoggedIn,
      path: req.path,
      showLorum: !!process.env.LORUM,
    };
  }

  app.get('/', async (request, reply) => {
    const props = await getRenderProps(request);
    const appHTML = renderToString(() => <App {...props} />);
    const html = pageTemplate.replace(
      '#page-content',
      `<div id="root">${appHTML}</div>`
    );

    reply.header('Content-Type', 'text/html');

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
