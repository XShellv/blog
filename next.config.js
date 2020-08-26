const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];
        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader",
        });
      }
      config.module.rules.push({
        enforce: "pre",
        test: /\.less$/,
        use: [
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                path.resolve("./style/abstracts/variables.less"),
              ],
            },
          },
        ],
      });
      return config;
    },
  })
);
