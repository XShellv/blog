import api from "lib/api";
import React, { useState, useCallback, useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import withPrivateRoute from "@/components/WithPrivateRoute";
import CustomList, { IPosts } from "@/components/CustomList";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

const Notes: NextPage<{
  list: IPosts;
}> = (props) => {
  return <CustomList {...props} />;
};

Notes.getInitialProps = async (ctx) => {
  const { req, query, res } = ctx;
  const resp = await api.request(
    {
      url: `/post?pageSize=${query.pageSize || 10}&pageNo=${
        query.pageNo || 1
      }&category=notes`,
    },
    ctx
  );
  return {
    list: resp.data.data,
  };
};

export default withPrivateRoute(Notes);
