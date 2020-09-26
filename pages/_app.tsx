import { useEffect } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import Head from "next/head";
import "../style/index.less";
import "vditor/dist/index.css";
import api from "../lib/api";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/actions";
import { wrapper } from "../redux/store";

import type { AppProps, AppContext } from "next/app";

const setRem = async () => {
  await require("../public/static/js/flexible");
};

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch();
  // useEffect(()=>{
  //     setRem()
  //     window && window.addEventListener('resize',setRem)
  // })

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const resp: any = await api.request({ url: "/user/info" });
    dispatch(setUserInfo(resp.data));
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

// MyApp.getInitialProps = async (ctx: { req: any; query: any; }) => {
//   const { req, query } = ctx;
//   const resp = await api.request({ url: "/user/info" });
//   // console.log(resp, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
//   return {

//   };
// };

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(tickClock(false));
// });

export default wrapper.withRedux(MyApp);
