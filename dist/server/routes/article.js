"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("@koa/router");
const router = new Router();
const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({
    html: true,
    linkify: true,
});
const fetchMd = (file) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `../../mock/${file}.txt`), "utf-8", function (err, data) {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(md.render(data));
            }
        });
    });
};
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
exports.default = router;
//# sourceMappingURL=article.js.map