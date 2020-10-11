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
const antd_2 = require("antd");
const icons_1 = require("@ant-design/icons");
const react_redux_1 = require("react-redux");
const actions_1 = require("redux/actions");
const besideInfo_1 = __importDefault(require("@/components/besideInfo"));
const toc_1 = __importDefault(require("@/components/toc"));
const config = require("../server/config/config");
exports.menuOptions = [
    {
        name: "首页",
        path: "/",
        key: "/",
        icon: <i className="iconfont">&#xe605;</i>,
    },
    // {
    //   name: "开发",
    //   path: "/develop",
    //   key: "/develop",
    //   icon: <i className="iconfont">&#xe962;</i>,
    // },
    {
        name: "笔记",
        path: "/notes",
        key: "/notes",
        icon: <i className="iconfont">&#xe62a;</i>,
        auth: true,
    },
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
    const { userInfo, isAdmin } = react_redux_1.useSelector((state) => state);
    const dispatch = react_redux_1.useDispatch();
    const menu = (<antd_1.Menu className="login-menu">
      <antd_1.Menu.Item>
        <a href="https://www.xshellv.com/manage" target="_blank">
          管理后台
        </a>
      </antd_1.Menu.Item>
      <antd_1.Menu.Item>
        <a href="#" onClick={(e) => {
        e.preventDefault();
        dispatch(actions_1.logout());
    }}>
          退出登录
        </a>
      </antd_1.Menu.Item>
    </antd_1.Menu>);
    let renderLog = null;
    if (userInfo) {
        renderLog = (<antd_1.Dropdown overlay={menu}>
        <antd_1.Space>
          <antd_2.Avatar size={30} src={userInfo["avatar_url"]}/>
          <span className="login-name">{userInfo["name"]}</span>
        </antd_1.Space>
      </antd_1.Dropdown>);
    }
    else {
        renderLog = (<antd_1.Tooltip title={<span style={{ fontSize: 12 }}>点击进行管理员登录</span>}>
        <a className="login-link" href={`/prepare-auth?url=${router.asPath}`}>
          <antd_1.Space>
            <antd_2.Avatar size={30} icon={<icons_1.UserOutlined />}/>
            <span className="logout-name">未登录</span>
          </antd_1.Space>
        </a>
      </antd_1.Tooltip>);
    }
    return (<div id="layout">
      <Header id="header">
        <link_1.default href="/">
          <a className="logo">
            <span className="iconfont">&#xe603;</span>Xshellv Blog
          </a>
        </link_1.default>
        <div className="options">
          <antd_1.Menu mode="horizontal" className="menu" theme="dark" selectedKeys={[router.pathname]}>
            {exports.menuOptions.map((op) => {
        const renderMenu = (<antd_1.Menu.Item key={op.key} className="menu-item">
                  <link_1.default href={op.path}>
                    <a>
                      {op.icon}
                      {op.name}
                    </a>
                  </link_1.default>
                </antd_1.Menu.Item>);
        if (op.auth) {
            if (isAdmin) {
                return renderMenu;
            }
            return null;
        }
        else {
            return renderMenu;
        }
    })}
          </antd_1.Menu>
          <div className="log-options">{renderLog}</div>
        </div>
        
      </Header>

      <antd_1.Row gutter={[{ md: 12, lg: 30, xl: 100, xxl: 400 }, 24]}>
        <antd_1.Col span={24}>
          <Content id="body">
            <antd_1.Row gutter={[24, 24]}>
              <antd_1.Col xs={0} md={0} lg={8} xl={6}>
                <besideInfo_1.default />
                {router.pathname === "/article" && <toc_1.default />}
              </antd_1.Col>
              <antd_1.Col xs={24} md={24} lg={16} xl={18}>
                {children}
              </antd_1.Col>
            </antd_1.Row>
          </Content>
        </antd_1.Col>
      </antd_1.Row>
      <Footer id="footer">
        <div className="footerInfo">
          
          <p className="support">
            托管于腾讯云、使用Ant Design、next.js服务端框架
          </p>
          <p className="copyright">❤️ Copyright © 2020 developed by Xshellv</p>
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