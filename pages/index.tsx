import Link from "next/link";
import { Card, Avatar, Pagination } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag.tsx";
import api from "lib/api";
import { useState } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
export const dateFormat = "YYYY-MM-DD HH:mm:ss"

interface IList {
  count: number;
  rows: any;
}
const Home: NextPage<any> = ({ list }) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const handlePageChange = () => {};
  return (
    <div id="home-wrapper">
      <CustomLayout>
        <div className="list">
          {list.rows.map((row: any) => {
            return <ArticleCard {...row} />;
          })}
        </div>
        <div className="pagnization">
          <Card bordered={false}>
            <Pagination
              total={list.count}
              showTotal={(total) => `共 ${total} 篇`}
              pageSize={pageSize}
              current={pageNo}
              onChange={handlePageChange}
              showQuickJumper
            />
          </Card>
        </div>
      </CustomLayout>
    </div>
  );
};

interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}

Home.getInitialProps = async (ctx: NextPageContext) => {
  const { req, query } = ctx;
  const resp = await api.request({
    url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
  });
  console.log(resp.data.data);
  if (resp.data.success) {
    return {
      list: resp.data.data,
    };
  }
};

const ArticleCard = (props: any) => {
  const {
    abstract,
    title,
    content,
    category,
    like,
    read,
    updatedAt,
    tags,
  } = props;
  return (
    <Card bordered={false} className="list-item">
      <h1 className="home-card-title">
        <Link href="/article">
          <a>{title}</a>
        </Link>
      </h1>
      <div className="home-card-extra">
        {/* <Avatar
          className="home-card-extra-avatar"
          src="https://xshellv.com/static/images/avatar.jpg"
        /> */}
        <div className="tags">
          {tags.map((tag: any) => (
            <CustomTag>{tag.name}</CustomTag>
          ))}
        </div>
        <div className="extra">
          <span className="home-card-extra-time">
            发布于：{moment(new Date(updatedAt).valueOf()).format(dateFormat)}
          </span>
        </div>
      </div>

      {/* <Link href={"/article?id=" + item.id} as={"/article/" + item.id}> */}
      <p className="home-card-abstract">{abstract}</p>
    </Card>
  );
};

export default Home;
