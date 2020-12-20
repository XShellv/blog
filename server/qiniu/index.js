const qiniu = require("qiniu"); // 需要加载qiniu模块的
const Router = require("koa-router");
const { bucket, accessKey, secretKey } = require("../config/qiniu");
const router = new Router();
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
const bucketManager = new qiniu.rs.BucketManager(mac, config);

router.post("/token", async (ctx, next) => {
  let options = {
    scope: bucket,
    expires: 3600 * 24,
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);
  if (uploadToken) {
    ctx.body = {
      success: true,
      uploadToken,
    };
  } else {
    ctx.body = {
      success: false,
      messahe: "fetch uploadToken error",
    };
  }
});

router.get("/prefix-list", async (ctx, next) => {
  const { marker, limit } = ctx.query;

  // @param options 列举操作的可选参数
  //                prefix    列举的文件前缀
  //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
  //                limit     每次返回的最大列举文件数量
  //                delimiter 指定目录分隔符
  var options = {
    limit,
    prefix: "",
    limit,
    marker: marker || "",
  };

  const listPrefix = () => {
    return new Promise((resolve, reject) => {
      bucketManager.listPrefix(bucket, options, (err, respBody, respInfo) => {
        if (err) {
          reject(err);
          throw err;
        }
        if (respInfo.statusCode == 200) {
          resolve(respInfo);
        } else {
          reject(respInfo);
        }
      });
    });
  };

  const data = await listPrefix();
  ctx.body = {
    success: true,
    data,
  };
  // .catch((e) => {
  //   ctx.body = {
  //     success: false,
  //     data: e,
  //   };
  // });
});

router.delete("/qiniu-delele", async (ctx, next) => {
  const { key } = ctx.query;

  const data = await (() => {
    return new Promise((resolve, reject) => {
      bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
          console.log(err);
          throw err;
        } else {
          if (respInfo.statusCode == 200) {
            resolve(respInfo);
          } else {
            reject(respInfo);
          }
        }
      });
    });
  })();

  ctx.body = {
    success: true,
    data,
  };
});

module.exports = router;
