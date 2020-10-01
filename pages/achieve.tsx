import { NextPage } from "next";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/customTag";
import api from "../lib/api";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Timeline, Card, List, Space } from "antd";
import classNames from "classnames";
import { IPosts, dateFormat } from "pages";
import { useState, useEffect } from "react";
import { useQuery } from "@/hooks/useQuery";
import moment from "moment";
interface ITag {
  //   markdownStr: string;
  count: number;
  name: string;
}
interface ITags {
  data: ITag[];
  total: number;
}
const Achieve: NextPage<{
  tags: ITags;
  posts: IPosts;
}> = ({ tags, posts: initPosts }) => {
  const router = useRouter();
  const { query, jumpTo, getQuery } = useQuery();
  const tag = getQuery("tag") || "";
  const pageNo = getQuery("pageNo") * 1 || 1;
  const pageSize = getQuery("pageSize") || 10;
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(initPosts);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const resp = await api.request({
        url: `/post?pageSize=${pageSize}&pageNo=${pageNo}&tag=${encodeURI(
          tag
        )}`,
      });
      setLoading(false);
      setPosts(resp.data.data);
    })();
  }, [pageNo, pageSize, tag]);

  return (
    <div id="achieve-wrapper">
      <Head>
        <title>归档</title>
        <meta property="og:title" content="My page title" key="about" />
      </Head>
      <CustomLayout>
        <Card bordered={false}>
          <List
            size="small"
            header={
              <div className="tags">
                <CustomTag
                  key="total"
                  className={classNames({ active: tag === "" })}
                  handleClick={() => {
                    query.set("tag", "");
                    query.set("pageNo", "1");
                    jumpTo(query);
                  }}
                >
                  全部 ({tags.total})
                </CustomTag>
                {tags.data.map((t: ITag) => (
                  <CustomTag
                    key={t.name}
                    className={classNames({ active: tag === t.name })}
                    handleClick={() => {
                      query.set("tag", t.name);
                      query.set("pageNo", "1");
                      jumpTo(query);
                    }}
                  >
                    {t.name} ({t.count})
                  </CustomTag>
                ))}
              </div>
            }
            // footer={<div>Footer</div>}
            bordered={false}
            dataSource={posts.rows}
            loading={loading}
            renderItem={(item) => (
              <List.Item
                extra={
                  <Space>
                    <span className="time">
                      发布于：
                      {moment(new Date(item.updatedAt).valueOf()).format(
                        dateFormat
                      )}
                    </span>
                  </Space>
                }
              >
                <Link href={`/article/${item.id}`}>
                  <a>{item.title}</a>
                </Link>
              </List.Item>
            )}
            pagination={{
              total: posts.count,
              showTotal: (total) => `共 ${total} 篇`,
              pageSize: pageSize,
              current: pageNo,
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
              hideOnSinglePage: true,
              size: "small",
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "50"],
            }}
          />
        </Card>
      </CustomLayout>
    </div>
  );
};

Achieve.getInitialProps = async (ctx) => {
  const { req, query } = ctx;
  const resp = await Promise.all([
    api.request({ url: `/tags` }),
    api.request({
      url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo ||
        1}&tag=${encodeURI((query.tag as string) || "")}`,
    }),
  ]);
  return {
    tags: {
      data: resp[0].data.data,
      total: resp[0].data.total,
    },
    posts: resp[1].data.data,
  };
};

export default Achieve;
