"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const axios_1 = __importDefault(require("axios"));
const article_1 = __importDefault(require("./routes/article"));
const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = new Koa();
const router = new Router();
async function requestHtml(method, url, data) {
    return await axios_1.default({
        method,
        url: `${github_base_url}${url}`,
        data,
    });
}
app.prepare().then(() => {
    router.get("/", async (ctx) => {
        await app.render(ctx.req, ctx.res, "/", ctx.query);
        ctx.respond = false;
    });
    router.get("/article", async (ctx) => {
        await app.render(ctx.req, ctx.res, "/article", ctx.query);
        ctx.respond = false;
    });
    router.all("*", async (ctx) => {
        await handle(ctx.req, ctx.res).catch((e) => {
            console.log(e);
        });
        ctx.respond = false;
    });
    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200;
        await next();
    });
});
server.use(article_1.default.routes());
server.use(article_1.default.allowedMethods());
server.use(router.routes());
server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map