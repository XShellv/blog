const Router = require("@koa/router");
const koaStatic = require("koa-static");
const path = require("path");

const manageRouter = new Router();
manageRouter.all("*", async (ctx) => {
  console.log(ctx.path, "///////////////");
  await ctx.render("index");
});

module.exports = manageRouter;
