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
const MarkdownRenderer_1 = __importDefault(require("@/components/MarkdownRenderer"));
const Comment_1 = __importDefault(require("@/components/Comment"));
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const CustomTag_1 = __importDefault(require("@/components/CustomTag"));
const tocbot = __importStar(require("tocbot"));
const api_1 = __importDefault(require("../lib/api"));
const react_dom_1 = __importDefault(require("react-dom"));
const react_1 = require("react");
const head_1 = __importDefault(require("next/head"));
const moment_1 = __importDefault(require("moment"));
const antd_1 = require("antd");
const Article = ({ markdownStr }) => {
    const articleRef = react_1.useRef(null);
    react_1.useEffect(() => {
        generateTagId();
        tocbot.init({
            tocSelector: ".article-toc",
            contentSelector: ".markdown-body",
            hasInnerContainers: true,
        });
        return () => {
            tocbot.destroy();
        };
        // tocbot.refresh();
    }, []);
    const generateTagId = () => {
        const articleNode = react_dom_1.default.findDOMNode(articleRef.current);
        if (articleNode) {
            let nodes = articleNode.children;
            if (nodes.length) {
                for (let i = 0; i < nodes.length; i++) {
                    let node = nodes[i];
                    let reg = /^H[1-6]{1}$/;
                    if (reg.exec(node.tagName)) {
                        if (!node.id) {
                            node.id = node.textContent;
                        }
                    }
                }
            }
        }
    };
    return (<div id="article-wrapper">
      <head_1.default>
        <title>Antd 是怎么使用 React 制作 notification 组件</title>
        <meta property="og:title" content="My page title" key="article"/>
        <script src="/static/js/prism.js"></script>
      </head_1.default>

      <Layout_tsx_1.default>
        <antd_1.Card bordered={false}>
          <div className="article-header" style={{
        backgroundImage: `url(https://prismjs.com/assets/img/spectrum.png)`,
    }}></div>

          <h1>Antd 是怎么使用 React 制作 notification 组件</h1>
          <CustomTag_1.default>React</CustomTag_1.default>
          <CustomTag_1.default>css</CustomTag_1.default>
          <CustomTag_1.default>javascript</CustomTag_1.default>
          
          <p className="article-info">
            <span>
              <antd_1.Avatar shape="circle" className="avatar" src="https://xshellv.com/static/images/avatar.jpg"/>
              Xshellv
            </span>
            <span className="time">{moment_1.default().format("YYYY年MM月DD日")}</span>
          </p>

          <div className="article-content">
            <MarkdownRenderer_1.default html={markdownStr} ref={articleRef}/>
            <div className="article-toc"></div>
          </div>
        </antd_1.Card>
        <antd_1.Card bordered={false}>
          <Comment_1.default />
        </antd_1.Card>
        <antd_1.BackTop />
      </Layout_tsx_1.default>
    </div>);
};
// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }
Article.getInitialProps = async () => {
    const resp = await api_1.default.request({ url: `/md` });
    return {
        markdownStr: resp.data,
    };
};
exports.default = Article;
//# sourceMappingURL=article.jsx.map