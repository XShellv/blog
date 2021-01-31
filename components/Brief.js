import React, { useState, useCallback, useEffect, FC, Fragment } from "react";
import {
  Card,
  List,
  Row,
  Col,
  Avatar,
  Button,
  Tooltip,
  Image,
  Typography,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import MyTp from "./MyTp";
import { useSelector } from "react-redux";

export const dateFormat = "YYYY-MM-DD HH:mm:ss";
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
const Brief = () => {
  const { baiduInfo, total, isAdmin } = useSelector((state) => state);

  const router = useRouter();
  return (
    <div className="brief-info">
      <Card className="my-card" bordered={false} size="small">
        <div className="avatar">
          <Image
            width={100}
            src="https://cdn.xshellv.com/avatar"
          // style={{ borderRadius: "50%" }}
          />
          {/* <Avatar size={60} src="https://cdn.xshellv.com/avatar" /> */}
        </div>
        <div className="me">
          <h4>Xshellv</h4>
          <span>徐小武的BUG站</span>
        </div>
        <div className="options">
          <MyTp title="CSDN">
            <a target="blank" href="https://blog.csdn.net/weixin_40774527">
              <i className="iconfont">&#xeee4;</i>
            </a>
          </MyTp>

          <MyTp title="简书">
            <a target="blank" href="https://www.jianshu.com/u/dfed43ff08bc">
              <i className="iconfont">&#xeee5;</i>
            </a>
          </MyTp>

          <MyTp title="知乎">
            <a
              target="blank"
              href="https://www.zhihu.com/people/yu-zi-jiang-54-7/activities"
            >
              <i className="iconfont">&#xe600;</i>
            </a>
          </MyTp>

          <MyTp title="github">
            <a target="blank" href="https://github.com/xshellv">
              <i className="iconfont">&#xeee2;</i>
            </a>
          </MyTp>
        </div>
        <ul className="menus">
          {menuOptions.map((op) => {
            const renderMenu = (
              <li key={op.name} >
                <Link href={op.path}>
                  <a>
                    {/* {op.icon} */}
                    {op.name}
                  </a>
                </Link>
              </li>
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
        </ul>
        <Button
          type="primary"
          block
          onClick={() => window.open("https://github.com/XShellv", "_blank")}
        >
          关注我
      </Button>
        <div className="baiduInfo">
          <h5>
            访问量
          <br />
            {baiduInfo["sum"][0][0]}
          </h5>
          <h5>
            访客数
          <br />
            {baiduInfo["sum"][0][1]}
          </h5>
          <h5>
            文章数
          <br />
            {total}
          </h5>
        </div>
      </Card>
      <p className="icp">苏ICP备19014278号</p>
    </div>
  );
};

export default Brief;
