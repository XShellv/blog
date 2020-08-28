"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const CustomTag_tsx_1 = __importDefault(require("@/components/CustomTag.tsx"));
function Home() {
    // const [close, setClose] = useState(false);
    return (<div id="home-wrapper">
      <Layout_tsx_1.default>
        <div className="list">
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
        <div className="pagnization">
          <antd_1.Card bordered={false}>
            <antd_1.Pagination total={85} showTotal={(total) => `共 ${total} 篇`} defaultPageSize={20} defaultCurrent={1} showQuickJumper/>
          </antd_1.Card>
        </div>
      </Layout_tsx_1.default>
    </div>);
}
exports.default = Home;
const ArticleCard = () => {
    return (<antd_1.Card bordered={false} className="list-item">
      <h1 className="home-card-title">
        <link_1.default href="/article">
          <a>Antd 是怎么使用 React 制作 notification 组件</a>
        </link_1.default>
      </h1>
      <div className="home-card-extra">
        
        <span className="home-card-extra-time">2020-12-24</span>
      </div>

      
      <p className="home-card-abstract">
        简单的来说就是使用 notification component 渲染出 notice
        components，然后使用 notification class 中的方法生成对应的位置的
        notification component来实现的。简单的来说就是使用 notification
        component 渲染出 notice components，然后使用 notification class
        中的方法生成对应的位置的 notification
        component来实现的。简单的来说就是使用 notification component 渲染出
        notice components，然后使用 notification class 中的方法生成对应的位置的
        notification component来实现的。简单的来说就是使用 notification
        component 渲染出 notice components，然后使用 notification class
        中的方法生成对应的位置的 notification component来实现的。
      </p>
      <CustomTag_tsx_1.default>React</CustomTag_tsx_1.default>
      <CustomTag_tsx_1.default>阿里巴巴</CustomTag_tsx_1.default>
    </antd_1.Card>);
};
//# sourceMappingURL=index.jsx.map