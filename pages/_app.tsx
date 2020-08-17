import 'antd/dist/antd.css';
import 'gitalk/dist/gitalk.css'
import "github-markdown-css";
import '../style/index.less';


import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp