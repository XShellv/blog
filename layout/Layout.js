import React, { useContext } from "react";
import Link from "next/link";
import { Col, Dropdown, Layout, Menu, Row, Space, Tooltip } from "antd";
const { Header, Footer, Content } = Layout;
import moment from "moment";
import { withRouter } from "next/router";
import { Avatar } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "redux/reducer";
import axios from "axios";
import Toc from "@/components/Toc";
import MostTags from "@/components/MostTags";
import Besides from "@/components/Besides";
const config = require("../server/config/config");

export const menuOptions = [
  {
    name: "首页",
    path: "/",
    key: "/",
    icon: <i className="iconfont">&#xe605;</i>,
  },
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

  // {
  //   name: "开发",
  //   path: "/develop",
  //   key: "/develop",
  //   icon: <i className="iconfont">&#xe962;</i>,
  // },

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
const CustomLayout = ({ children, router }) => {
  const { userInfo, isAdmin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const menu = (
    <Menu className="login-menu">
      <Menu.Item>
        <a href="https://www.xshellv.com/manage" target="_blank">
          管理后台
        </a>
      </Menu.Item>
      <Menu.Item>
        <a href={`/logout?url=${router.asPath}`}>退出登录</a>
      </Menu.Item>
    </Menu>
  );

  let renderLog = null;
  if (userInfo) {
    renderLog = (
      <Dropdown overlay={menu}>
        <Space>
          <Avatar size={30} src={userInfo["avatar_url"]} />
          <span className="login-name">
            {userInfo["name"] || userInfo["login"]}
          </span>
        </Space>
      </Dropdown>
    );
  } else {
    renderLog = (
      <Tooltip title={<span style={{ fontSize: 12 }}>点击进行管理员登录</span>}>
        <a className="login-link" href={`/prepare-auth?url=${router.asPath}`}>
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
      {/* <Pheader isAdmin={isAdmin} router={router} /> */}
      <Mheader isAdmin={isAdmin} router={router} />
      <Content id="body">
        <Row gutter={[24, 24]}>
          <Col xs={0} md={0} lg={8} xl={6} xxl={6}>
            {router.pathname === "/article" ? <Toc /> : <Besides />}
          </Col>
          <Col xs={24} md={24} lg={16} xl={18} xxl={18}>
            {children}
            {/* <Footer id="footer">
              <p className="support">
                托管于腾讯云、使用Ant Design、next.js服务端框架
              </p>
              <p className="copyright">
                ❤️ Copyright © 2020 developed by Xshellv
              </p>
              <p className="icp">
                <a target="blank" href="http:www.beian.miit.gov.cn/">
                  苏ICP备19014278号
                </a>
              </p>
            </Footer> */}
          </Col>
        </Row>
      </Content>
    </div>
  );
};

const Pheader = ({ isAdmin, router }) => {
  return (
    <Header id="pheader">
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
            const renderMenu = (
              <Menu.Item key={op.key} className="menu-item">
                <Link href={op.path}>
                  <a>
                    {op.icon}
                    {op.name}
                  </a>
                </Link>
              </Menu.Item>
            );
            if (op.auth) {
              if (isAdmin) {
                return renderMenu;
              }
              return null;
            } else {
              return renderMenu;
            }
          })}
        </Menu>
        {/* <div className="log-options">{renderLog}</div> */}
      </div>
      {/* <div className="search">
<Input
  style={{ width: 250 }}
  placeholder="输入文章标题关键词查询..."
  allowClear
/>
</div> */}
    </Header>
  );
};
const Mheader = ({ isAdmin, router }) => {
  const menu = (
    <Menu>
      {menuOptions.map((op) => {
        const renderMenu = (
          <Menu.Item key={op.key} className="menu-item">
            <Link href={op.path}>
              <a>
                {op.icon}
                {op.name}
              </a>
            </Link>
          </Menu.Item>
        );
        if (op.auth) {
          if (isAdmin) {
            return renderMenu;
          }
          return null;
        } else {
          return renderMenu;
        }
      })}
    </Menu>
  );
  return (
    <Header id="mheader">
      <Link href="/">
        <a className="logo">
          <span className="iconfont">&#xe603;</span>Xshellv Blog
        </a>
      </Link>
      <div className="options">
        <Dropdown overlay={menu} className="dropMenu">
          <a className="menus" onClick={(e) => e.preventDefault()}>
            <MenuOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};
export default withRouter(CustomLayout);
