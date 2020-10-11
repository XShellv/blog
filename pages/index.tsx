import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button } from "antd";
import CustomTag from "@/components/customTag.tsx";
import { useQuery } from "@/hooks/useQuery";
import api from "lib/api";
import React, { useState, useCallback, useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import {
  useRouter,
  withRouter,
  NextRouter,
  SingletonRouter,
} from "next/router";
import withPrivateRoute from "@/components/withPrivateRoute";
import Custom404 from "./404";
import CustomList, { IPosts } from "@/components/customList";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Index: NextPage<{
  list: IPosts;
}> = (props) => {
  return <CustomList {...props} />;
};

Index.getInitialProps = async (ctx) => {
  const { req, query, res } = ctx;
  console.log(
    req?.headers.cookie,
    "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"
  );
  // if (res) {
  //   res?.writeHead(302, {
  //     Location: login,
  //   });
  //   res?.end();
  // } else {
  //   Router.replace(login);
  // }
  const resp = await api.request(
    {
      url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
    },
    ctx
  );
  return {
    list: resp.data.data,
  };
};

export default Index;
