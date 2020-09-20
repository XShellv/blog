import {ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Head from 'next/head';
import '../style/index.less';
import "vditor/dist/index.css"
import type { AppProps /*, AppContext */ } from 'next/app'


const setRem = async ()=>{
  await require('../public/static/js/flexible');
}

function MyApp({ Component, pageProps }: AppProps) {

// useEffect(()=>{
//     setRem()
//     window && window.addEventListener('resize',setRem)
// })

  return(
    <ConfigProvider locale={zhCN}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp