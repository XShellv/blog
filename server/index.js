const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const combineRouters = require("koa-combine-routers");
const bodyParser = require("koa-bodyparser");
const initdb = require("./mysql");

// server.use(require("koa-static")(__dirname + "/"));
const server = new Koa();

server.use(bodyParser());
const apiRouter = require("./routes/post");

const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
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

  pageRouter.get("/achieve", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/achieve", ctx.query);
    ctx.respond = false;
  });

  pageRouter.get("/about", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/about", ctx.query);
    ctx.respond = false;
  });

  pageRouter.all("*", async (ctx) => {
    await handle(ctx.req, ctx.res).catch((e) => {
      console.log(e);
    });
    ctx.respond = false;
  });
});

const router = combineRouters(apiRouter, pageRouter);
server.use(router());

initdb().then(async (result) => {
  if (result) {
    console.log("> sync models successfully...");
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
