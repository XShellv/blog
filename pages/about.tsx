import { NextPage } from "next";
import CustomLayout from "@/layout/Layout.tsx";
import Comment from "@/components/comment";
import api from "../lib/api";
import Head from "next/head";
import { Card, Col, Row, Spin } from "antd";
import React from "react";
import dynamic from "next/dynamic";
import PageLoading from "@/components/pageLoading";

const VditorMd = dynamic(() => import("@/components/vditorMd"), {
  ssr: false,
  loading: () => <PageLoading />,
});
interface IAbout {
  markdownStr: string;
}
const About: NextPage<IAbout> = ({ markdownStr }) => {
  return (
    <div>
      <Head>
        <title>关于我</title>
        <meta property="og:title" content="My page title" key="about" />
        <script src="/static/js/prism.js"></script>
      </Head>
      <Card bordered={false} style={{ position: "relative", minHeight: 300 }}>
        <VditorMd content={markdownStr} />
      </Card>
      <Card bordered={false}>
        <Comment />
      </Card>
    </div>
  );
};

// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }

About.getInitialProps = async () => {
  const resp = await api.request({ url: `/me` });
  return {
    markdownStr: resp.data.data.content,
  };
};

export default About;
