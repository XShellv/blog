"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const antd_1 = require("antd");
const zh_CN_1 = __importDefault(require("antd/lib/locale/zh_CN"));
require("../style/index.less");
const setRem = async () => {
    await require('../public/static/js/flexible');
};
function MyApp({ Component, pageProps }) {
    // useEffect(()=>{
    //     setRem()
    //     window && window.addEventListener('resize',setRem)
    // })
    return (<antd_1.ConfigProvider locale={zh_CN_1.default}>
      <Component {...pageProps}/>
    </antd_1.ConfigProvider>);
}
exports.default = MyApp;
//# sourceMappingURL=_app.jsx.map