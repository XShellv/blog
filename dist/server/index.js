"use strict";
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const combineRouters = require("koa-combine-routers");
const bodyParser = require("koa-bodyparser");
const initdb = require("./mysql");
const koaStatic = require("koa-static");
const session = require("koa-session");
const path = require("path");
const fs = require("fs");
const Store = require("./config/store");
const postRouter = require("./routes/post");
const aboutRouter = require("./routes/about");
const authRouter = require("./routes/auth");
const pageRouter = new Router();
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
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
    pageRouter.get("/favicon.ico", async (ctx, next) => {
        ctx.body = null;
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
    // pageRouter.get("/notes", async (ctx) => {
    //   const { tag, pageNo, pageSize } = ctx.query;
    //   ctx.query = { tag, pageNo, pageSize };
    //   await app.render(ctx.req, ctx.res, "/", ctx.query);
    //   ctx.respond = false;
    // });
    // pageRouter.get("/notes", async (ctx) => {
    //   await app.render(ctx.req, ctx.res, "/notes", ctx.query);
    //   ctx.respond = false;
    // });
    pageRouter.get("/about", async (ctx) => {
        await app.render(ctx.req, ctx.res, "/about", ctx.query);
        ctx.respond = false;
    });
    pageRouter.all("*", async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });
    const router = combineRouters(authRouter, postRouter, aboutRouter, pageRouter);
    server.use(router());
    initdb().then(async (result) => {
        console.log("> sync models successfully...");
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`);
        });
        server.on("error", function (err) {
            console.log(err);
        });
    });
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map