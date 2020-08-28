"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const { Header, Footer, Content } = antd_1.Layout;
const moment_1 = __importDefault(require("moment"));
const router_1 = require("next/router");
const menuOptions = [
    {
        name: "首页",
        path: "/",
        key: "/",
        icon: <i className="iconfont">&#xe605;</i>,
    },
    {
        name: "开发",
        path: "/develop",
        key: "/develop",
        icon: <i className="iconfont">&#xe962;</i>,
    },
    //   {
    //     name: "设计",
    //     path: "/design",
    //     key: "设计",
    //     icon: <i className="iconfont">&#xe62a;</i>,
    //   },
    {
        name: "归档",
        path: "/achieve",
        key: "/achieve",
        icon: <i className="iconfont">&#xe604;</i>,
    },
    {
        name: "关于我",
        path: "/about",
        key: "/about",
        icon: <i className="iconfont">&#xe646;</i>,
    },
];
const gap = () => {
    const startTime = moment_1.default("2020-08-16").valueOf();
    const nowTime = moment_1.default().valueOf();
    let runTime = (nowTime - startTime) / 1000;
    let Y = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);
    let M = Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);
    let D = Math.floor(runTime / 86400);
    return {
        Y: Y < 10 ? `0${Y}` : Y,
        M: M < 10 ? `0${M}` : M,
        D: D < 10 ? `0${D}` : D,
    };
};
const CustomLayout = ({ children, router }) => {
    return (<div id="layout">
      <Header id="header">
        <link_1.default href="/">
          <a className="logo">
            <span className="iconfont">&#xe603;</span>Xshellv Blog
          </a>
        </link_1.default>
        <antd_1.Menu mode="horizontal" className="menu" theme="dark" selectedKeys={[router.pathname]}>
          {menuOptions.map((op) => {
        return (<antd_1.Menu.Item key={op.key} className="menu-item">
                <link_1.default href={op.path}>
                  <a>
                    {op.icon} {op.name}
                  </a>
                </link_1.default>
              </antd_1.Menu.Item>);
    })}
        </antd_1.Menu>
        
      </Header>
      <Content id="body">{children}</Content>
      <Footer id="footer">
        <div className="footerInfo">
          <p className="time">
            {`🕑 创建于2020年08月16日、已运行${gap().Y}年${gap().M}月${gap().D}天`}
          </p>
          <p className="support">
            托管于腾讯云、使用Ant Design、next.js服务端框架
          </p>
          <p className="copyright">
            ❤️ Copyright © 2020 developed by Xshellv
          </p>
          <p className="icp">
            <a target="blank" href="http://www.beian.miit.gov.cn/">
              苏ICP备19014278号
            </a>
          </p>
        </div>
      </Footer>
    </div>);
};
exports.default = router_1.withRouter(CustomLayout);
//# sourceMappingURL=Layout.jsx.map