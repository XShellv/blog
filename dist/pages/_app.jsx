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
const router_1 = require("next/router");
const initialize_1 = __importDefault(require("util/initialize"));
const setRem = async () => {
    await require("../public/static/js/flexible");
};
function MyApp({ Component, pageProps }) {
    const isAdmin = react_redux_1.useSelector((state) => state.isAdmin);
    const dispatch = react_redux_1.useDispatch();
    // useEffect(()=>{
    //     setRem()
    //     window && window.addEventListener('resize',setRem)
    // })
    react_1.useEffect(() => {
        router_1.Router.events.on("routeChangeStart", startLoading);
        router_1.Router.events.on("routeChangeComplete", stopLoading);
        router_1.Router.events.on("routeChangeError", stopLoading);
        return () => {
            router_1.Router.events.off("routeChangeStart", startLoading);
            router_1.Router.events.off("routeChangeComplete", stopLoading);
            router_1.Router.events.off("routeChangeError", stopLoading);
        };
    }, []);
    const startLoading = () => {
        dispatch(actions_1.setLoading(true));
    };
    const stopLoading = () => {
        dispatch(actions_1.setLoading(false));
    };
    react_1.useEffect(() => {
        // 判断是否存在cookie
        console.log(isAdmin);
        if (isAdmin) {
            fetchUser();
        }
        else {
            dispatch(actions_1.setUserInfo(null));
        }
    }, [isAdmin]);
    const fetchUser = async () => {
        const resp = await api_1.default.request({ url: "/user/info" });
        dispatch(actions_1.setUserInfo(resp.data));
    };
    return (<antd_1.ConfigProvider locale={zh_CN_1.default}>
      <Component {...pageProps}/>
    </antd_1.ConfigProvider>);
}
MyApp.getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};
    /** 应用初始化, 一定要在Component.getInitiialProps前面
     *  因为里面是授权，系统最优先的逻辑
     *  传入的参数是ctx，里面包含store和req等
     **/
    initialize_1.default(ctx);
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps, Component };
};
// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
// });
exports.default = store_1.wrapper.withRedux(MyApp);
//# sourceMappingURL=_app.jsx.map