import {useEffect} from "react";
import {ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'gitalk/dist/gitalk.css'
// import "github-markdown-css";
import '../style/index.less';
import type { AppProps /*, AppContext */ } from 'next/app'


const setRem = async ()=>{
  await require('../public/static/js/flexible');
}

function MyApp({ Component, pageProps }: AppProps) {

useEffect(()=>{
    setRem()
    window && window.addEventListener('resize',setRem)
})
  return(
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
      </ConfigProvider>
  )
}

export default MyApp