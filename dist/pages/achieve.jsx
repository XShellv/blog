"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const CustomTag_1 = __importDefault(require("@/components/CustomTag"));
const api_1 = __importDefault(require("../lib/api"));
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const tags_json_1 = __importDefault(require("./tags.json"));
const time_json_1 = __importDefault(require("./time.json"));
const Achieve = () => {
    return (<div id="achieve-wrapper">
      <head_1.default>
        <title>归档</title>
        <meta property="og:title" content="My page title" key="about"/>
      </head_1.default>
      <Layout_tsx_1.default>
        <antd_1.Card bordered={false}>
          <div className="tags">
            {tags_json_1.default.map((t) => (<CustomTag_1.default key={t.tagName}>
                {t.tagName} ({t.count})
              </CustomTag_1.default>))}
          </div>
        </antd_1.Card>
        <antd_1.Card bordered={false}>
          <div>
            <antd_1.Timeline>
              {time_json_1.default.map((t) => {
        return t.map((s, i) => {
            if (i === 0) {
                return (<antd_1.Timeline.Item key={s.id} dot={<i className="iconfont">&#xe64b;</i>}>
                        {s.updatedAt}
                      </antd_1.Timeline.Item>);
            }
            return (<antd_1.Timeline.Item color="gray" key={s.id}>
                      {i !== 0 && (<>
                          <link_1.default href="/article">{s.title}</link_1.default>
                          <br />
                          <span className="time">2020年05月20日</span>
                        </>)}
                    </antd_1.Timeline.Item>);
        });
    })}
            </antd_1.Timeline>
          </div>
        </antd_1.Card>
      </Layout_tsx_1.default>
    </div>);
};
// interface Context extends NextPageContext {
//   // any modifications to the default context, e.g. query types
// }
Achieve.getInitialProps = async () => {
    const resp = await api_1.default.request({ url: `/ab` });
    return {
        markdownStr: resp.data,
    };
};
exports.default = Achieve;
//# sourceMappingURL=achieve.jsx.map