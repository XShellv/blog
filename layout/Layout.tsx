import React, { useContext } from "react";
import Link from "next/link";
import { Col, Dropdown, Layout, Menu, Row, Space, Tooltip } from "antd";
const { Header, Footer, Content } = Layout;
import moment from "moment";
import { withRouter } from "next/router";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "redux/reducer";
import { login, logout } from "redux/actions";
import axios from "axios";
const config = require("../server/config/config");

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
  {
    name: "笔记",
    path: "/notes",
    key: "笔记",
    icon: <i className="iconfont">&#xe62a;</i>,
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
  const startTime = moment("2020-08-16").valueOf();
  const nowTime = moment().valueOf();
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
const CustomLayout: React.FC<any> = ({ children, router }) => {
  const userInfo = useSelector((state: IState) => state.userInfo);
  const dispatch = useDispatch();

  const menu = (
    <Menu className="login-menu">
      <Menu.Item>
        <a
          href="https://www.xshellv.com/manage"
          target="_blank"
        >
          管理后台
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            dispatch(logout());
          }}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  let renderLog = null;
  if (userInfo) {
    renderLog = (
      <Dropdown overlay={menu}>
        <Space>
          <Avatar size={30} src={userInfo["avatar_url"]} />
          <span className="login-name">{userInfo["name"]}</span>
        </Space>
      </Dropdown>
    );
  } else {
    renderLog = (
      <Tooltip title={<span style={{ fontSize: 12 }}>点击进行管理员登录</span>}>
        <a className="login-link" href={`/preapre-auth?url=${router.asPath}`}>
          <Space>
            <Avatar size={30} icon={<UserOutlined />} />
            <span className="logout-name">未登录</span>
          </Space>
        </a>
      </Tooltip>
    );
  }
  return (
    <div id="layout">
      <Header id="header">
        <Link href="/">
          <a className="logo">
            <span className="iconfont">&#xe603;</span>Xshellv Blog
          </a>
        </Link>
        <div className="options">
          <Menu
            mode="horizontal"
            className="menu"
            theme="dark"
            selectedKeys={[router.pathname]}
          >
            {menuOptions.map((op) => {
              return (
                <Menu.Item key={op.key} className="menu-item">
                  <Link href={op.path}>
                    <a>
                      {op.icon} {op.name}
                    </a>
                  </Link>
                </Menu.Item>
              );
            })}
          </Menu>
          <div className="log-options">{renderLog}</div>
        </div>
        {/* <div className="search">
          <Input
            style={{ width: 250 }}
            placeholder="输入文章标题关键词查询..."
            allowClear
          />
        </div> */}
      </Header>
      <Row gutter={[{ md: 12, lg: 30, xl: 100, xxl: 400 }, 24]}>
        <Col span={24}>
          <Content id="body">{children}</Content>
        </Col>
      </Row>
      <Footer id="footer">
        <div className="footerInfo">
          {/* <p className="time">
            {`🕑 创建于2020年08月16日、已运行${gap().Y}年${gap().M}月${
              gap().D
            }天`}
          </p> */}
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
    </div>
  );
};

export default withRouter(CustomLayout);
