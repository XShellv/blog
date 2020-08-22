const pxtorem = require("postcss-px2rem");
module.exports = {
  plugins: [
    pxtorem({
      rootValue: 16,
      unitPrecision: 5,
      propList: ["*"],
      selectorBlackList: [/^\.nop2r/, /^\.am/, "html"],
      //排除antd样式，由于我给html设置了min-width，所以把html也排除在外不做rem转换
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    }),
  ],
};
