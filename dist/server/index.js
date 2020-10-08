"use strict";
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const session = require("koa-session");
const proxy = require("koa2-proxy-middleware");
const path = require("path");
const fs = require("fs");
const auth = require("./config/auth");
const Store = require("./config/store");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
app
    .prepare()
    .then(() => {
    const server = new Koa();
    const router = new Router();
    const options = {
        targets: {
            "/api/(.*)": {
                target: "http://localhost:8000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                },
            },
        },
    };
    server.use(proxy(options));
    server.use(bodyParser());
    server.keys = ["xshellv is a programmer"];
    const SESSION_CONFIG = {
        key: "user",
        store: new Store(),
    };
    server.use(session(SESSION_CONFIG, server));
    // 配置处理github OAuth的登录
    auth(server);
    router.get("/article/:id", async (ctx) => {
        const id = ctx.params.id;
        await handle(ctx.req, ctx.res, {
            pathname: "/article",
            query: {
                id,
            },
        });
        ctx.respond = false;
    });
    router.all("*", async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
    });
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    });
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
    server.on("error", function (err) {
        console.log(err);
    });
})
    .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map