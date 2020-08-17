import { useState } from "react";
import Link from "next/link";
import { Card, Typography, Avatar, Space, Pagination } from "antd";
import CustomLayout from "@/layout/Layout.tsx";
import CustomTag from "@/components/CustomTag.tsx";
const { Title, Paragraph, Text } = Typography;

export default function Home() {
  const [close, setClose] = useState(false);
  return (
    <div id="home-wrapper">
      <CustomLayout>
        <div className="list">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
        <div className="pagnization">
          <Card bordered={false}>
            <Pagination
              total={85}
              showTotal={(total) => `共 ${total} 篇`}
              defaultPageSize={20}
              defaultCurrent={1}
              showQuickJumper
            />
          </Card>
        </div>
      </CustomLayout>
    </div>
  );
}

const ArticleCard = () => {
  return (
    <Card bordered={false} className="list-item">
      <Title className="home-card-title">
        Antd 是怎么使用 React 制作 notification 组件
      </Title>
      <div className="home-card-extra">
        <Space>
          <Avatar
            className="home-card-extra-avatar"
            src="https://xshellv.com/static/images/avatar.jpg"
          />
          <span className="home-card-extra-time">January 14, 2020</span>
        </Space>
      </div>

      {/* <Link href={"/article?id=" + item.id} as={"/article/" + item.id}> */}
      <Link href="/article">
        <a className="home-card-abstract">
          <Paragraph ellipsis={{ rows: 4 }}>
            简单的来说就是使用 notification component 渲染出 notice
            components，然后使用 notification class 中的方法生成对应的位置的
            notification component来实现的。简单的来说就是使用 notification
            component 渲染出 notice components，然后使用 notification class
            中的方法生成对应的位置的 notification
            component来实现的。简单的来说就是使用 notification component 渲染出
            notice components，然后使用 notification class
            中的方法生成对应的位置的 notification
            component来实现的。简单的来说就是使用 notification component 渲染出
            notice components，然后使用 notification class
            中的方法生成对应的位置的 notification component来实现的。
          </Paragraph>
        </a>
      </Link>
      <CustomTag>React</CustomTag>
    </Card>
  );
};
