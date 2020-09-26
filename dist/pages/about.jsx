"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const Comment_1 = __importDefault(require("@/components/Comment"));
const api_1 = __importDefault(require("../lib/api"));
const head_1 = __importDefault(require("next/head"));
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
const dynamic_1 = __importDefault(require("next/dynamic"));
const PageLoading_1 = __importDefault(require("@/components/PageLoading"));
const VditorMd = dynamic_1.default(() => Promise.resolve().then(() => __importStar(require("@/components/VditorMd"))), {
    ssr: false,
    loading: () => <PageLoading_1.default />,
});
const About = ({ markdownStr }) => {
    return (<div>
      <head_1.default>
        <title>关于我</title>
        <meta property="og:title" content="My page title" key="about"/>
        <script src="/static/js/prism.js"></script>
      </head_1.default>
      <Layout_tsx_1.default>
        <antd_1.Card bordered={false} style={{ position: "relative", minHeight: 300 }}>
          <VditorMd content={markdownStr}/>
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
    const resp = await api_1.default.request({ url: `/me` });
    return {
        markdownStr: resp.data.data.content,
    };
};
exports.default = About;
//# sourceMappingURL=about.jsx.map