import Link from "next/link";
import { Card, List, Pagination } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag.tsx";
import api from "lib/api";
import { useState, useCallback } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

interface ITag {
  id: number;
  name: string;
}
interface IPost {
  id: number;
  abstract: string;
  title: string;
  post: string;
  category: string;
  like: number;
  read: number;
  createdAt: string;
  updatedAt: string;
  tags: ITag[];
}
interface IList {
  initList: {
    count: number;
    rows: IPost[];
  };
}
const Home: NextPage<IList> = ({ initList }) => {
  const [list, setList] = useState(initList);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);

  const handlePageChange = async (pageNo: number, pageSize?: number) => {
    setLoading(true);
    const resp = await api.request({
      url: `/post?pageSize=${pageSize || 10}&pageNo=${pageNo || 1}`,
    });
    setLoading(false)
    setList(resp.data.data);
  };

  return (
    <div id="home-wrapper">
      <CustomLayout>
        <List
          bordered={false}
          size="small"
          loading={loading}
          dataSource={list.rows}
          renderItem={(row) => (
            <List.Item>
              <ArticleCard key={row.title} {...row} />
            </List.Item>
          )}
          pagination={{
            total: list.count,
            showTotal: (total) => `共 ${total} 篇`,
            // pageSize={pageSize}
            // current={pageNo}
            onChange: (pageNo, pageSize) => {
              handlePageChange(pageNo, pageSize);
            },
            onShowSizeChange: (pageNo, pageSize) => {
              handlePageChange(pageNo, pageSize);
            },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
        />

        {/* <div className="list">
          {list.rows.map((row: IPost) => {
            return <ArticleCard key={row.title} {...row} />;
          })}
        </div> */}
        {/* <div className="pagnization">
          <Card bordered={false}>
            <Pagination
              total={list.count}
              showTotal={(total) => `共 ${total} 篇`}
              // pageSize={pageSize}
              // current={pageNo}
              onChange={(pageNo, pageSize) => {
                handlePageChange(pageNo, pageSize);
              }}
              onShowSizeChange={(pageNo, pageSize) => {
                handlePageChange(pageNo, pageSize);
              }}
              showQuickJumper
              showSizeChanger
              pageSizeOptions={["10", "20", "50"]}
            />
          </Card>
        </div> */}
      </CustomLayout>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const { req, query } = ctx;
  const resp = await api.request({
    url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
  });
  return {
    initList: resp.data.data,
  };
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
    <div className="list-item">
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
          {tags.map((tag: ITag) => (
            <CustomTag key={tag.name}>{tag.name}</CustomTag>
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
    </div>
  );
};

export default Home;
