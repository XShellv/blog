const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const combineRouters = require("koa-combine-routers");
const bodyParser = require("koa-bodyparser");
const initdb = require("./mysql");
const koaStatic = require("koa-static");
const server = new Koa();
const path = require("path");
const views = require("koa-views");
const postRouter = require("./routes/post");
const aboutRouter = require("./routes/about");
server.use(bodyParser());

server.use(koaStatic(path.resolve(__dirname, "../public/dist")));
server.use(
  views(path.resolve(__dirname, "../public/dist"), { extension: "html" })
);
server.use(async (ctx, next) => {
  await next();
});

const manageRouter = new Router();
manageRouter.all(/\.js/i, koaStatic(path.resolve(__dirname, "../public/dist")));
manageRouter.get("/manage/*", async (ctx) => {
  console.log(ctx.path, "///////////////");
  await ctx.render("index");
});

const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 5000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const pageRouter = new Router();

app
  .prepare()
  .then(() => {
    pageRouter.get("/", async (ctx) => {
      await app.render(ctx.req, ctx.res, "/", ctx.query);
      ctx.respond = false;
    });

    pageRouter.get("/article/:id", async (ctx) => {
      ctx.query = { id: ctx.params.id };
      await app.render(ctx.req, ctx.res, "/article", ctx.query);
      ctx.respond = false;
    });

    pageRouter.get("/achieve", async (ctx) => {
      const { tag, pageNo, pageSize } = ctx.query;
      ctx.query = { tag, pageNo, pageSize };
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
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });

const router = combineRouters(
  postRouter,
  aboutRouter,
  pageRouter,
  manageRouter
);
server.use(router());

initdb().then(async (result) => {
  if (result) {
    console.log("> sync models successfully...");
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
