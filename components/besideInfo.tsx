import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag.tsx";
import { useQuery } from "@/hooks/useQuery";
import api from "lib/api";
import React, { useState, useCallback, useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import { useRouter } from "next/router";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const BesideInfo: React.FC = () => {
  const router = useRouter();
  return (
    <Card className="brief-info">
      <div className="avatar">
        <Avatar size={100} src="https://cdn.xshellv.com/avatar" />
      </div>
      <div className="me">
        <span>徐小武</span>
        <span>xshellv</span>
        <span>
          <span></span>上海长宁区
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
        <a
          target="blank"
          href="https://blog.csdn.net/weixin_40774527"
          title="CSDN"
        >
          <i className="iconfont">&#xeee4;</i>
        </a>
        <a
          target="blank"
          href="https://www.jianshu.com/u/dfed43ff08bc"
          title="简书"
        >
          <i className="iconfont">&#xeee5;</i>
        </a>
        <a
          target="blank"
          href="https://www.zhihu.com/people/yu-zi-jiang-54-7/activities"
          title="知乎"
        >
          <i className="iconfont">&#xe600;</i>
        </a>
        <a target="blank" href="https://github.com/xshellv" title="github">
          <i className="iconfont">&#xeee2;</i>
        </a>
      </div>
    </Card>
  );
};

export default BesideInfo;
