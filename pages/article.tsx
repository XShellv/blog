import { NextPage } from "next";
import { findDOMNode } from "react-dom";
import Comment from "@/components/comment";
import { useRouter } from "next/router";
import CustomTag from "@/components/customTag";
import api from "../lib/api";
import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { BackTop, Avatar, Card, Button, Spin, message } from "antd";
import { IPost, ITag, dateFormat } from "@/components/customList";
import * as tocbot from "tocbot";
// import VditorMd from "@/components/vditorMd";
import MarkdownRenderer from "@/components/markdownRenderer";
import Error from "./error";
import { useDispatch } from "react-redux";
import { setStatus } from "redux/actions";
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
  const dispatch = useDispatch();
  const router = useRouter();

  const articleRef = useRef(null);
  const generateTagId = () => {
    const articleNode: any = findDOMNode(articleRef.current);
    console.log(articleNode)
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

  useEffect(() => {
    generateTagId();
    tocbot.init({
      tocSelector: ".article-toc",
      contentSelector: ".markdown-body",
      hasInnerContainers: true,
    });
    tocbot.refresh();
    return () => {
      tocbot.destroy();
    };
  }, []);

  return post ? (
    <div id="article-wrapper">
      <Head>
        <title>{post.title}</title>
        <meta property="og:title" content="My page title" key="article" />
        <script src="/static/js/prism.js"></script>
      </Head>

      <Card bordered={false} size="small">
        <h1 className="article-title">{post.title}</h1>
        <div className="article-info">
          <div className="tags">
            {post.tags.map((tag: ITag) => (
              <CustomTag key={tag.name}
              handleClick={() =>
                router.push({
                  pathname: "/achieve",
                  query: { tag: tag.name },
                })
              }
              >{tag.name}</CustomTag>
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
          {/* <VditorMd content={post.content} /> */}
          <MarkdownRenderer content={post.content} ref={articleRef} />
          {/* <div className="article-toc"></div> */}
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
          {post.next && (
            <Link href={`/article/${post.next.id}`}>
              <a className="right">
                <span>{post.next.title}</span>
                <i className="iconfont">&#xe606;</i>
              </a>
            </Link>
          )}
        </div>
      </Card>
      <Card bordered={false} size="small">
        <Comment />
      </Card>
      <BackTop />
    </div>
  ) : null;
};

Article.getInitialProps = async (ctx) => {
  const { req, res, query } = ctx;
  const resp = await api.request({ url: `/post/${query.id}` }, ctx);
  console.log(res);
  if (!resp.data.success) {
    ctx.store.dispatch(setStatus(404));
  }

  return {
    post: resp.data.data,
  };
};

export default Article;
