const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
import axios from "axios";
const combineRouters = require('koa-combine-routers')
import apiRouter from './routes/article'

const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = new Koa();
const pageRouter = new Router();

app.prepare().then(() => {
  pageRouter.get("/", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/", ctx.query);
    ctx.respond = false;
  });

  pageRouter.get("/article", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/article", ctx.query);
    ctx.respond = false;
  });

  pageRouter.all("*", async (ctx) => {
    await handle(ctx.req, ctx.res).catch((e) => {
      console.log(e);
    });
    ctx.respond = false;
  });
});


const router = combineRouters(
  apiRouter,
  pageRouter,
);
server.use(router());


server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});
