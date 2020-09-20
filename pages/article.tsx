import { NextPage } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Comment from "@/components/Comment";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag";
import api from "../lib/api";
import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import dynamic from "next/dynamic";
import { BackTop, Avatar, Card, Button, Spin } from "antd";
import { IPost, ITag, dateFormat } from "pages";

const VditorMd = dynamic(() => import("@/components/VditorMd"), {
  ssr: false,
  loading: () => <Spin />,
});
interface IArticle extends IPost {
  content: string;
  prev: null | number;
  next: null | number;
}
const Article: NextPage<{
  post: IArticle;
}> = ({ post }) => {
  const articleRef = useRef(null);
  useEffect(() => {
    // generateTagId();
    // tocbot.init({
    //   tocSelector: ".article-toc",
    //   contentSelector: "#vditor",
    //   hasInnerContainers: true,
    // });
    // return () => {
    //   tocbot.destroy();
    // };
    // tocbot.refresh();
  }, []);

  // const generateTagId = () => {
  //   const articleNode: any = ReactDOM.findDOMNode(articleRef.current);
  //   if (articleNode) {
  //     let nodes = articleNode.children;
  //     if (nodes.length) {
  //       for (let i = 0; i < nodes.length; i++) {
  //         let node = nodes[i];
  //         let reg = /^H[1-6]{1}$/;
  //         if (reg.exec(node.tagName)) {
  //           if (!node.id) {
  //             node.id = node.textContent;
  //           }
  //         }
  //       }
  //     }
  //   }
  // };
  return (
    <div id="article-wrapper">
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content="My page title" key="article" />
        <script src="/static/js/prism.js"></script>
      </Head>

      <CustomLayout>
        <Card bordered={false}>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-info">
            <div className="tags">
              {post.tags.map((tag: ITag) => (
                <CustomTag key={tag.name}>{tag.name}</CustomTag>
              ))}
            </div>
            <div className="extra">
              <span className="time">
                发布于：
                {moment(new Date(post.updatedAt).valueOf()).format(dateFormat)}
              </span>
            </div>
          </div>
          <div
            className="article-header"
            style={{
              backgroundImage: `url(${post.post})`,
            }}
          ></div>

          <div className="article-content">
            <VditorMd content={post.content} />
            {/* <MarkdownRenderer content={post.content}  /> */}
            <div className="article-toc"></div>
          </div>
          <div className="article-nav">
            {post.prev && (
              <Link href={`/article/${post.prev}`}>
                <a className="left">
                  <i className="iconfont">&#xe607;</i>
                  <span>{post.prev}</span>
                </a>
              </Link>
            )}
            {post.next && (
              <Link href={`/article/${post.next}`}>
                <a className="right">
                  <span>{post.next}</span>
                  <i className="iconfont">&#xe606;</i>
                </a>
              </Link>
            )}
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

Article.getInitialProps = async (ctx) => {
  const { req, query } = ctx;
  const resp = await api.request({ url: `/post/${query.id}` });
  return {
    post: resp.data.data,
  };
};

export default Article;
