import Link from "next/link";
import { Card, List, Row, Col, Avatar, Button } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag.tsx";
import { useQuery } from "@/hooks/useQuery";
import api from "lib/api";
import React, { useState, useCallback, useEffect } from "react";
import { NextPageContext, NextPage } from "next";
import moment from "moment";
import { useRouter } from "next/router";
import withPrivateRoute from "@/components/withPrivateRoute";
import Custom404 from "./404";
export const dateFormat = "YYYY-MM-DD HH:mm:ss";

export interface ITag {
  id: number;
  name: string;
}
export interface IPost {
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
export interface IPosts {
  count: number;
  rows: IPost[];
}
const Slug: NextPage<{
  initList: IPosts;
}> = ({ initList }) => {
  const { query, getQuery, jumpTo } = useQuery();
  const [list, setList] = useState(initList);
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await api.request({
        url: `/post?pageSize=${pageSize || 10}&pageNo=${pageNo || 1}`,
      });
      setLoading(false);
      setList(resp.data.data);
    })();
  }, [pageNo, pageSize]);
  
  const renderContent = (
    <div id="home-wrapper">
      <CustomLayout>
        <List
          bordered={false}
          size="small"
          loading={loading}
          dataSource={list.rows}
          renderItem={(row) => (
            <List.Item key={row.title}>
              <ArticleCard key={row.title} {...row} />
            </List.Item>
          )}
          pagination={{
            total: list.count,
            showTotal: (total) => `共 ${total} 篇`,
            pageSize: pageSize,
            current: pageNo,
            hideOnSinglePage: true,
            size: "small",
            onChange: (pageNo, pageSize) => {
              query.set("pageNo", pageNo + "");
              query.set("pageSize", pageSize + "");
              jumpTo(query);
            },
            onShowSizeChange: (pageNo, pageSize) => {
              query.set("pageNo", pageNo + "");
              query.set("pageSize", pageSize + "");
              jumpTo(query);
            },
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
        />
      </CustomLayout>
    </div>
  );
  return renderContent;
};

Slug.getInitialProps = async (ctx) => {
  const { req, query, res } = ctx;

  console.log(res, query,'??????');
  // if (res) {
  //   res?.writeHead(302, {
  //     Location: login,
  //   });
  //   res?.end();
  // } else {
  //   Router.replace(login);
  // }

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
    id,
  } = props;

  const router = useRouter();
  const { path } = router.query;
  console.log(path, ">>>>>>>>>>>>>>.");

  return (
    <div className="list-item">
      <h1 className="home-card-title">
        <Link href={`/article/${id}`}>
          <a>{title}</a>
        </Link>
      </h1>
      <div className="home-card-extra">
        <div className="tags">
          {tags.map((tag: ITag) => (
            <CustomTag
              key={tag.name}
              handleClick={() =>
                router.push({
                  pathname: "/achieve",
                  query: { tag: tag.name },
                })
              }
            >
              {tag.name}
            </CustomTag>
          ))}
        </div>
        <div className="extra">
          <span className="time">
            发布于：{moment(new Date(updatedAt).valueOf()).format(dateFormat)}
          </span>
        </div>
      </div>
      {/* <Link href={"/article?id=" + item.id} as={"/article/" + item.id}> */}
      <p className="home-card-abstract">{abstract}</p>
    </div>
  );
};

export default Slug;
