const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const combineRouters = require("koa-combine-routers");
const bodyParser = require("koa-bodyparser");
const initdb = require("./mysql");
const koaStatic = require("koa-static");
const session = require("koa-session");
const path = require("path");
const fs = require("fs");
const auth = require("./auth");
const Store = require("./config/store");
const postRouter = require("./routes/post");
const aboutRouter = require("./routes/about");
let index = 0;
// server.use(koaStatic(path.resolve(__dirname, "./public/manage")));

// server.use(async (ctx, next) => {
//   const reg = /^(\/manage)/;
//   if (reg.test(ctx.path)) {
//     ctx.response.type = "html";
//     ctx.response.body = fs.createReadStream(
//       path.resolve(__dirname, "./public/manage/manage.html")
//     );
//   } else {
//     await next();
//   }
// });

const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const pageRouter = new Router();

app
  .prepare()
  .then(() => {
    const server = new Koa();
    server.use(bodyParser());

    server.keys = ["xshellv is a programmer"];
    const SESSION_CONFIG = {
      key: "user",
      store: new Store(),
    };
    server.use(session(SESSION_CONFIG, server));
    // 配置处理github oauth登录
    auth(server);
    server.use(async (ctx, next) => {
      await next();
    });

    pageRouter.get("/set/user", async (ctx, next) => {
      ctx.session.user = {
        name: "xshellv",
        age: 27,
      };
      ctx.body = "set session successfully!";
    });

    pageRouter.get("/delete/user", async (ctx, next) => {
      ctx.session = null;
      ctx.body = "delete session successfully!";
    });

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
      ctx.cookies.set("id", index);
      index += 1;
      await handle(ctx.req, ctx.res).catch((e) => {
        console.log(e);
      });
      ctx.respond = false;
    });

    const router = combineRouters(postRouter, aboutRouter, pageRouter);
    server.use(router());

    initdb().then(async (result) => {
      if (result) {
        console.log("> sync models successfully...");
        server.listen(port, () => {
          console.log(`> Ready on http://localhost:${port}`);
        });
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
