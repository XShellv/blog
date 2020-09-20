import { NextPage } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CustomLayout from "@/layout/Layout.tsx";
import Comment from "@/components/Comment";
import api from "../lib/api";
import Head from "next/head";
import { Card, Spin } from "antd";
import React from "react";
import dynamic from "next/dynamic";
const VditorMd = dynamic(() => import("@/components/VditorMd"), {
  ssr: false,
  loading: () => <Spin />,
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
      <CustomLayout>
        <Card bordered={false}>
          {/* <MarkdownRenderer content={markdownStr} /> */}
          <VditorMd content={markdownStr} />
        </Card>
        <Card bordered={false}>
          <Comment />
        </Card>
      </CustomLayout>
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
