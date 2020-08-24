import { NextPage, NextPageContext } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Comment from "@/components/Comment";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag";
import api from "../lib/api";
import { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import moment from "moment";
import { BackTop, Space, Timeline, Card } from "antd";
import tags from "./tags.json";
import time from "./time.json";

interface IAchieve {
  //   markdownStr: string;
}
const Achieve: NextPage<IAchieve> = () => {
  return (
    <div id="achieve-wrapper">
      <Head>
        <title>归档</title>
        <meta property="og:title" content="My page title" key="about" />
      </Head>
      <CustomLayout>
        <Card bordered={false}>
          <div className="tags">
            {tags.map((t) => (
              <CustomTag key={t.tagName}>
                {t.tagName} ({t.count})
              </CustomTag>
            ))}
          </div>
        </Card>
        <Card bordered={false}>
          <div>
            <Timeline>
              {time.map((t) => {
                return t.map((s, i) => {
                  if (i === 0) {
                    return (
                      <Timeline.Item
                        key={s.id}
                        dot={<i className="iconfont">&#xe64b;</i>}
                      >
                        {s.updatedAt}
                      </Timeline.Item>
                    );
                  }
                  return (
                    <Timeline.Item color="gray" key={s.id}>
                      {i !== 0 && (
                        <>
                          <Link href="/article">{s.title}</Link>
                          <br />
                          <span className="time">2020年05月20日</span>
                        </>
                      )}
                    </Timeline.Item>
                  );
                });
              })}
            </Timeline>
          </div>
        </Card>
      </CustomLayout>
    </div>
  );
};

interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}

Achieve.getInitialProps = async (ctx: Context) => {
  const resp = await api.request({ url: `/ab` });
  return {
    markdownStr: resp.data,
  };
};

export default Achieve;
