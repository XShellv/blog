import api from "lib/api";
import React, { useState, useCallback, useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import withPrivateRoute from "@/components/withPrivateRoute";
import Custom404 from "./404";
import CustomList, { IPosts } from "@/components/customList";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Notes: NextPage<{
  list: IPosts;
}> = (props) => {
  return <CustomList {...props} />;
};

Notes.getInitialProps = async (ctx) => {
  console.log(ctx)
  const { req, query, res } = ctx;
  const resp = await api.request({
    url: `/post?pageSize=${query.pageSize || 10}&pageNo=${
      query.pageNo || 1
    }&category=notes`,
  });
  return {
    list: resp.data.data,
  };
};

export default withPrivateRoute(Notes);
