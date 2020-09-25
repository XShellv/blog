import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Head from 'next/head';
import '../style/index.less';
import "vditor/dist/index.css";
import api from "../lib/api";

import type { AppProps /*, AppContext */ } from 'next/app'
import { useEffect } from 'react';


const setRem = async () => {
  await require('../public/static/js/flexible');
}

function MyApp({ Component, pageProps }: AppProps) {

  // useEffect(()=>{
  //     setRem()
  //     window && window.addEventListener('resize',setRem)
  // })


  useEffect(() => {
    fetchUser();
  })

  const fetchUser = async () => {
    const resp = await api.request({ url: "/user/info" });
    console.log(resp)
  }
  return (
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

// MyApp.getInitialProps = async (ctx: { req: any; query: any; }) => {
//   const { req, query } = ctx;
//   const resp = await api.request({ url: "/user/info" });
//   // console.log(resp, '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
//   return {

//   };
// };

export default MyApp