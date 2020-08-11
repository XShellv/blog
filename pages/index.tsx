import { useState } from "react";
import Link from "next/link";
import {
  Layout,
  Card,
  Typography,
  Tag,
  Avatar,
  Space,
  PageHeader,
  Input,
} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph, Text } = Typography;

const routes = [
  {
    path: "/",
    breadcrumbName: "首页",
  },
];
export default function Home() {
  const [close, setClose] = useState(false);
  return (
    <div id="home-wrapper">
      <Layout className="home-layout">
        <Sider
          id="sider"
          style={{ bottom: 0, color: "#fff" }}
          width={250}
          collapsible
          trigger={null}
          collapsed={close}
        >
          <div className="sider-info">
            <Avatar
              className="avatar"
              src="https://xshellv.com/static/images/avatar.jpg"
            />
            <p className="greet">Hi,I am Xshellv</p>
            <p className="career">职业：设计师、前端开发工程师</p>
            <ul className="menu">
              <li>
                <Link href="design">首页</Link>
              </li>
              <li>
                <Link href="design">开发</Link>
              </li>
              <li>
                <Link href="design">设计</Link>
              </li>
              <li>
                <Link href="design">归档</Link>
              </li>
              <li>
                <Link href="design">设计</Link>
              </li>
              <li>
                <Link href="design">关于我</Link>
              </li>
            </ul>
            <div className="contact">
              <a
                target="blank"
                href="https://www.facebook.com/xiaowu.xu.90"
                title="twitter"
              >
                <i className="iconfont">&#xe601;</i>
              </a>
              <a
                target="blank"
                href="https://blog.csdn.net/weixin_40774527"
                title="CSDN"
              >
                <i className="iconfont">&#xeee4;</i>
              </a>
              <a
                target="blank"
                href="https://www.jianshu.com/u/dfed43ff08bc"
                title="简书"
              >
                <i className="iconfont">&#xeee5;</i>
              </a>
              <a
                target="blank"
                href="https://www.zhihu.com/people/yu-zi-jiang-54-7/activities"
                title="知乎"
              >
                <i className="iconfont">&#xe600;</i>
              </a>
              <a
                target="blank"
                href="https://github.com/xshellv"
                title="github"
              >
                <i className="iconfont">&#xeee2;</i>
              </a>
            </div>
          </div>
        </Sider>
        <Layout className="body-layout">
          <Header id="header">
            <PageHeader
              title={
                <div>
                  <span>
                    {close ? (
                      <i
                        className="iconfont trigger"
                        onClick={() => setClose(false)}
                      >
                        &#xe61b;
                      </i>
                    ) : (
                      <i
                        className="iconfont trigger"
                        onClick={() => setClose(true)}
                      >
                        &#xe68f;
                      </i>
                    )}
                  </span>
                  <span>首页</span>
                </div>
              }
              // breadcrumb={{ routes }}
              extra={
                <Input
                  style={{ width: 250 }}
                  placeholder="输入文章标题关键词查询..."
                  allowClear
                />
              }
            ></PageHeader>
          </Header>
          <Content id="body">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </Content>
          <Footer id="footer">
            <div className="footerInfo">
              <p className="copyright">
                {" "}
                ❤️ Copyright © 2019 Xshellv - designed by Xshellv
              </p>
              <p className="support">
                托管于腾讯云、使用Ant Design、next.js服务端框架
              </p>
              <p className="icp">
                <a target="blank" href="http://www.beian.miit.gov.cn/">
                  苏ICP备19014278号
                </a>
              </p>
            </div>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

const ArticleCard = () => {
  return (
    <Card bordered={false}>
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
      <Link href="#">
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
      <Tag className="custom-tag" color="#05264c">
        notification 组件
      </Tag>
      <Tag color="#05264c">notification 组件</Tag>
      <Tag color="#05264c">notification 组件</Tag>
    </Card>
  );
};
