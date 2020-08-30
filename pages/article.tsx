import { NextPage } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Comment from "@/components/Comment";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag";
import * as tocbot from "tocbot";
import api from "../lib/api";
import ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { BackTop, Avatar, Card, Button } from "antd";

interface IArticle {
  markdownStr: string;
}
const Article: NextPage<IArticle> = ({ markdownStr }) => {
  const articleRef = useRef(null);
  useEffect(() => {
    generateTagId();
    tocbot.init({
      tocSelector: ".article-toc",
      contentSelector: ".markdown-body",
      hasInnerContainers: true,
    });
    return () => {
      tocbot.destroy();
    };

    // tocbot.refresh();
  }, []);

  const generateTagId = () => {
    const articleNode: any = ReactDOM.findDOMNode(articleRef.current);
    if (articleNode) {
      let nodes = articleNode.children;
      if (nodes.length) {
        for (let i = 0; i < nodes.length; i++) {
          let node = nodes[i];
          let reg = /^H[1-6]{1}$/;
          if (reg.exec(node.tagName)) {
            if (!node.id) {
              node.id = node.textContent;
            }
          }
        }
      }
    }
  };
  return (
    <div id="article-wrapper">
      <Head>
        <title>Antd 是怎么使用 React 制作 notification 组件</title>
        <meta property="og:title" content="My page title" key="article" />
        <script src="/static/js/prism.js"></script>
      </Head>

      <CustomLayout>
        <Card bordered={false}>
          <h1 className="article-title">
            Antd 是怎么使用 React 制作 notification 组件
          </h1>
          <div className="article-info">
            <div className="tags">
              <CustomTag>React</CustomTag>
              <CustomTag>css</CustomTag>
              <CustomTag>javascript</CustomTag>
            </div>
            <div className="extra">
              <span className="time">发布于：{moment().format("YYYY-MM-DD")}</span>
            </div>
          </div>
          <div
            className="article-header"
            style={{
              backgroundImage: `url(https://prismjs.com/assets/img/spectrum.png)`,
            }}
          ></div>

          <div className="article-content">
            <MarkdownRenderer html={markdownStr} ref={articleRef} />
            <div className="article-toc"></div>
          </div>
          <div className="article-nav">
            <Link href="#">
              <a className="left">
                <i className="iconfont">&#xe607;</i>
                <span>钢铁是怎样炼成的</span>
              </a>
            </Link>
            <Link href="#">
              <a className="right">
                <span>钢铁是怎样炼成的</span>
                <i className="iconfont">&#xe606;</i>
              </a>
            </Link>
          </div>
        </Card>
        <Card bordered={false}>
          <Comment />
        </Card>
        <BackTop />
      </CustomLayout>
    </div>
  );
};

// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }

Article.getInitialProps = async () => {
  const resp = await api.request({ url: `/md` });
  return {
    markdownStr: resp.data,
  };
};

export default Article;
