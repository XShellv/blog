const pxtorem = require("postcss-px2rem");
module.exports = {
  plugins: [
    // pxtorem({
    //   remUnit: 126,
    //   unitPrecision: 5,
    //   propList: ["*"],
    //   selectorBlackList: [/^\.nop2r/, /^\.am/, "html"],
    //   replace: true,
    //   mediaQuery: false,
    //   minPixelValue: 0,
    // }),
  ],
};
