import { NextPage } from "next";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import CustomLayout from "@/layout/Layout.tsx";
import Comment from "@/components/Comment";
import api from "../lib/api";
import Head from "next/head";
import { Card } from "antd";

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
          <MarkdownRenderer html={markdownStr} />
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
  const resp = await api.request({ url: `/ab` });
  return {
    markdownStr: resp.data,
  };
};

export default About;
