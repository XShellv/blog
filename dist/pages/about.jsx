"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MarkdownRenderer_1 = __importDefault(require("@/components/MarkdownRenderer"));
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const Comment_1 = __importDefault(require("@/components/Comment"));
const api_1 = __importDefault(require("../lib/api"));
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const About = ({ markdownStr }) => {
    return (<div>
      <head_1.default>
        <title>关于我</title>
        <meta property="og:title" content="My page title" key="about"/>
        <script src="/static/js/prism.js"></script>
      </head_1.default>
      <Layout_tsx_1.default>
        <antd_1.Card bordered={false}>
          <MarkdownRenderer_1.default html={markdownStr}/>
        </antd_1.Card>
        <antd_1.Card bordered={false}>
          <Comment_1.default />
        </antd_1.Card>
      </Layout_tsx_1.default>
    </div>);
};
// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }
About.getInitialProps = async () => {
    const resp = await api_1.default.request({ url: `/ab` });
    return {
        markdownStr: resp.data,
    };
};
exports.default = About;
//# sourceMappingURL=about.jsx.map