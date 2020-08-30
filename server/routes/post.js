const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const apiRouter = new Router();
const model = require("../mysql/models");
const MarkdownIt = require("markdown-it");
const Sequelize = require("sequelize");
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

const fetchMd = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, `../../mock/${file}.txt`),
      "utf-8",
      function(err, data) {
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

/**
 * 创建文章
 */
apiRouter.post("/post", async (ctx, next) => {
  const body = ctx.request.body;
  const findArticle = await model.Post.findOne({
    where: {
      title: body.title,
    },
  });
  if (findArticle) {
    ctx.body = {
      success: false,
      message: "the post is exist",
    };
  } else {
    const post = await model.Post.create(body);
    if (post) {
      const tags = await Promise.all(
        await body.tags.map((tag) => model.Tag.create({ name: tag }))
      );
      await post.addTags(tags);
      ctx.body = { success: true };
    }
  }
});

/**
 * 根据主键查找文章及关联的标签
 */
apiRouter.get("/post/:id", async (ctx, next) => {
  const { Op } = Sequelize;
  const id = ctx.params.id;
  const post = await model.Post.findByPk(id, {
    include: [{ model: model.Tag, attributes: ["id", "name"] }],
  });
  if (post) {
    const prev_post = await model.Post.findAll({
      order: [["id", "DESC"]],
      where: {
        id: { [Op.lt]: id * 1 },
      },
      attributes: ["id"],
      limit: 1,
    });
    const next_post = await model.Post.findAll({
      order: [["id", "ASC"]],
      where: {
        id: { [Op.gt]: id * 1 },
      },
      attributes: ["id"],
      limit: 1,
    });
    if (next_post && next_post[0]) {
      post.setDataValue("next", next_post[0].id);
    } else {
      post.setDataValue("next", null);
    }
    if (prev_post && prev_post[0]) {
      post.setDataValue("prev", prev_post[0].id);
    } else {
      post.setDataValue("prev", null);
    }
    ctx.body = {
      success: true,
      data: post,
    };
  } else {
    ctx.body = {
      success: false,
      message: "the query post was not found",
    };
  }
});

/**
 * 删除文章及关联的标签
 */
apiRouter.delete("/post/:id", async (ctx, next) => {
  const id = ctx.params.id;
  const findPost = await model.Post.findByPk(id);
  if (!findPost) {
    return (ctx.body = {
      success: false,
      message: "the delete post was not found",
    });
  }
  await findPost.addTags([]);
  const ret = await findPost.destroy();
  if (ret) {
    ctx.body = {
      success: true,
    };
  } else {
    return (ctx.body = {
      success: false,
      message: "the delete post tags were not found",
    });
  }
  // const findTags = await findPost.getTags();
  // if (findTags) {
  //   const destroyPost = findPost.destroy();
  //   const destroyTags = findTags.map((tag) => tag.destroy());
  //   const ret = await Promise.all([...destroyTags, destroyPost]);
  //   if (ret) {
  //     ctx.body = {
  //       success: true,
  //     };
  //   }
  // } else {
  //   return (ctx.body = {
  //     success: false,
  //     message: "the delete post tags were not found",
  //   });
  // }
});

/**
 * 更新文章或关联的标签
 */
apiRouter.post("/post/:id", async (ctx, next) => {
  const body = ctx.request.body;
  const id = ctx.params.id;
  const findPost = await model.Post.findByPk(id);
  if (!findPost) {
    return (ctx.body = {
      success: false,
      message: "the update post was not found",
    });
  }
  await findPost.update(body, {
    where: { id },
  });
  const tags = await Promise.all(
    await body.tags.map((tag) => model.Tag.create({ name: tag }))
  );
  const ret = await findPost.setTags(tags);
  if (ret) {
    ctx.body = {
      success: true,
    };
  } else {
    ctx.body = {
      success: false,
      message: "update post fail",
    };
  }
});

/**
 * 获取所有的标签
 */
apiRouter.get("/tags", async (ctx, next) => {
  const postTags = await model.PostTag.findAll({
    attributes: ["tagId"],
  });
  const ret = await model.Tag.findAll({
    where: {
      id: postTags.map((postTag) => postTag.tagId),
    },
    include: [
      {
        model: model.Post,
        // 这里可以对Post进行where
      },
    ],
  });
  if (ret) {
    ctx.body = {
      success: true,
      data: ret,
    };
  } else {
    ctx.body = {
      success: false,
      message: "query tags fail",
    };
  }
});

/**
 * 分页查询
 */
apiRouter.get("/post", async (ctx, next) => {
  const { pageSize, pageNo } = ctx.request.query;
  if (isNaN(pageSize * 1) || isNaN(pageNo)) {
    return (ctx.body = {
      success: false,
      message: "invalid query params",
    });
  }
  const ret = await model.Post.findAndCountAll({
    offset: (pageNo * 1 - 1) * pageSize * 1,
    limit: pageSize * 1,
    include: [{ model: model.Tag, attributes: ["id", "name"] }],
    order: [["createdAt", "DESC"]],
    distinct: true,
  });
  if (ret) {
    ctx.body = {
      success: true,
      data: ret,
    };
  } else {
    ctx.body = {
      success: false,
      message: "query exception",
    };
  }
});

// 获取文章
apiRouter.get("/md", async (ctx, next) => {
  const md = await fetchMd("md");
  ctx.body = md;
});

// 获取自我介绍
apiRouter.get("/ab", async (ctx, next) => {
  const md = await fetchMd("about");
  ctx.body = md;
});

async function requestHtml(method, url, data) {
  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
  });
}

module.exports = apiRouter;
