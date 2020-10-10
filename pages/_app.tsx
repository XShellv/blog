import React, { useEffect, useState } from "react";
import { ConfigProvider, Layout } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Head from "next/head";
import "../style/index.less";
import "vditor/dist/index.css";
import api from "../lib/api";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo, setLoading } from "../redux/actions";
import { wrapper } from "../redux/store";
import CustomLayout from "@/layout/Layout.tsx";
import type { AppProps, AppContext } from "next/app";
import { Router } from "next/router";
import PageLoading from "@/components/pageLoading";
import { getCookie } from "util/cookie";
import initialize from "util/initialize";
import { IState } from "redux/reducer";

const setRem = async () => {
  await require("../public/static/js/flexible");
};

function MyApp({ Component, pageProps }: AppProps) {
  const isAdmin = useSelector((state: IState) => state.isAdmin);
  const dispatch = useDispatch();
  // useEffect(()=>{
  //     setRem()
  //     window && window.addEventListener('resize',setRem)
  // })

  useEffect(() => {
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  const startLoading = () => {
    dispatch(setLoading(true));
  };

  const stopLoading = () => {
    dispatch(setLoading(false));
  };

  useEffect(() => {
    // 判断是否存在cookie
    if (isAdmin) {
      fetchUser();
    } else {
      dispatch(setUserInfo(null));
    }
  }, [isAdmin]);

  const fetchUser = async () => {
    const resp: any = await api.request({ url: "/user/info" });
    dispatch(setUserInfo(resp.data));
  };

  console.log(Component.name)
  return (
    <ConfigProvider locale={zhCN}>
      <CustomLayout>
        <Component {...pageProps} />
      </CustomLayout>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {};
  /** 应用初始化, 一定要在Component.getInitiialProps前面
   *  因为里面是授权，系统最优先的逻辑
   *  传入的参数是ctx，里面包含store和req等
   **/
  initialize(ctx);

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps, Component };
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
// });

export default wrapper.withRedux(MyApp);
