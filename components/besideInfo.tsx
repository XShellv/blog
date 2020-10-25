import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button, Tooltip } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag.tsx";
import { useQuery } from "@/hooks/useQuery";
import api from "lib/api";
import React, { useState, useCallback, useEffect, FC } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import { useRouter } from "next/router";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const MyTooltip: FC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <Tooltip
      title={<span style={{ fontSize: 12 }}>{title}</span>}
      placement="bottom"
    >
      {children}
    </Tooltip>
  );
};
const BesideInfo: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <Card className="brief-info my-card" bordered={false}>
        <div className="avatar">
          <Avatar size={60} src="https://cdn.xshellv.com/avatar" />
        </div>
        <div className="me">
          <span>徐小武</span>
          <span>Xshellv</span>
          <span>
            <span className="iconfont">&#xe611;</span>上海长宁区
          </span>
        </div>
        <Button
          type="primary"
          block
          onClick={() => window.open("https://github.com/XShellv", "_blank")}
        >
          关注我
        </Button>
        <div className="options">
          <MyTooltip title="CSDN">
            <a target="blank" href="https://blog.csdn.net/weixin_40774527">
              <i className="iconfont">&#xeee4;</i>
            </a>
          </MyTooltip>

          <MyTooltip title="简书">
            <a target="blank" href="https://www.jianshu.com/u/dfed43ff08bc">
              <i className="iconfont">&#xeee5;</i>
            </a>
          </MyTooltip>

          <MyTooltip title="知乎">
            <a
              target="blank"
              href="https://www.zhihu.com/people/yu-zi-jiang-54-7/activities"
            >
              <i className="iconfont">&#xe600;</i>
            </a>
          </MyTooltip>

          <MyTooltip title="github">
            <a target="blank" href="https://github.com/xshellv">
              <i className="iconfont">&#xeee2;</i>
            </a>
          </MyTooltip>
        </div>
      </Card>
    </>
  );
};

export default BesideInfo;
