const Koa = require("koa");
const next = require("next");
const Router = require("@koa/router");
const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
import axios from "axios";
import { url } from "inspector";
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

const github_base_url = "https://api.github.com";
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const fetchMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, `../mock/${file}.txt`),
      "utf-8",
      function (err, data) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(md.render(data));
        }
      }
    );
  });
};

async function requestHtml(method, url, data) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
  });
}

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get("/", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/", ctx.query);
    ctx.respond = false;
  });
  router.get("/article", async (ctx) => {
    await app.render(ctx.req, ctx.res, "/article", ctx.query);
    ctx.respond = false;
  });

  // 获取文章
  router.get("/md", async (ctx, next) => {
    const md = await fetchMd("md");
    ctx.body = md;
  });

  // 获取自我介绍
  router.get("/ab", async (ctx, next) => {
    const md = await fetchMd("about");
    ctx.body = md;
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

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
