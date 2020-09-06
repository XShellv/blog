const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const aboutRouter = new Router();
const model = require("../mysql/models");
const MarkdownIt = require("markdown-it");
const Sequelize = require("sequelize");
const sequelize = require("../mysql/util/database");
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

/**
 * 创建或更新关于我
 */
aboutRouter.post("/me", async (ctx, next) => {
  const body = ctx.request.body;
  const ret = await model.About.upsert({
    id: 1,
    ...body,
  });
  if (ret) {
    ctx.body = {
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
      message: "update about me info fail!",
    };
  }
});

/**
 * 获取关于我
 */
aboutRouter.get("/me", async (ctx, next) => {
  const ret = await model.About.findByPk(1);
  ret.content = md.render(ret.content);
  ctx.body = {
    success: true,
    data: ret,
  };
});

// const fetchMd = (file) => {
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         path.resolve(__dirname, `../../mock/${file}.txt`),
//         "utf-8",
//         function(err, data) {
//           if (err) {
//             console.error(err);
//             reject(err);
//           } else {
//             resolve();
//           }
//         }
//       );
//     });
//   };

module.exports = aboutRouter;
