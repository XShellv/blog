"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const antd_1 = require("antd");
const zh_CN_1 = __importDefault(require("antd/lib/locale/zh_CN"));
require("../style/index.less");
require("vditor/dist/index.css");
const api_1 = __importDefault(require("../lib/api"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../redux/actions");
const store_1 = require("../redux/store");
const setRem = async () => {
    await require("../public/static/js/flexible");
};
function MyApp({ Component, pageProps }) {
    const dispatch = react_redux_1.useDispatch();
    // useEffect(()=>{
    //     setRem()
    //     window && window.addEventListener('resize',setRem)
    // })
    react_1.useEffect(() => {
        fetchUser();
    }, []);
    const fetchUser = async () => {
        const resp = await api_1.default.request({ url: "/user/info" });
        dispatch(actions_1.setUserInfo(resp.data));
    };
    return (<antd_1.ConfigProvider locale={zh_CN_1.default}>
      <Component {...pageProps}/>
    </antd_1.ConfigProvider>);
}
// MyApp.getInitialProps = async (ctx: { req: any; query: any; }) => {
//   const { req, query } = ctx;
//   const resp = await api.request({ url: "/user/info" });
//   // console.log(resp, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
//   return {
//   };
// };
// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
// });
exports.default = store_1.wrapper.withRedux(MyApp);
//# sourceMappingURL=_app.jsx.map