import { NextPage } from "next";
import Comment from "@/components/comment";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag";
import api from "../lib/api";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import dynamic from "next/dynamic";
import { BackTop, Avatar, Card, Button, Spin } from "antd";
import { IPost, ITag, dateFormat } from "pages";
import PageLoading from "@/components/pageLoading";

const VditorMd = dynamic(() => import("@/components/vditorMd"), {
  ssr: false,
  loading: () => <PageLoading />,
});
interface IArticle extends IPost {
  content: string;
  prev: null | {
    title: string;
    id: number;
  };
  next: null | {
    title: string;
    id: number;
  };
}
const Article: NextPage<{
  post: IArticle;
}> = ({ post }) => {
  useEffect(() => {}, []);
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

          <div className="article-content" style={{ position: "relative" }}>
            <VditorMd content={post.content} />
            <div className="article-toc"></div>
          </div>
          <div className="article-nav">
            {post.prev ? (
              <Link href={`/article/${post.prev.id}`}>
                <a className="left">
                  <i className="iconfont">&#xe607;</i>
                  <span>{post.prev.title}</span>
                </a>
              </Link>
            ) : (
              <span></span>
            )}
            {post.next ? (
              <Link href={`/article/${post.next.id}`}>
                <a className="right">
                  <span>{post.next.title}</span>
                  <i className="iconfont">&#xe606;</i>
                </a>
              </Link>
            ) : (
              <span></span>
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
