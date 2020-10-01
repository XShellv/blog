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
const customTag_1 = __importDefault(require("@/components/customTag"));
const api_1 = __importDefault(require("../lib/api"));
const head_1 = __importDefault(require("next/head"));
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
const antd_1 = require("antd");
const classnames_1 = __importDefault(require("classnames"));
const _slug_1 = require("./[slug]");
const react_1 = __importStar(require("react"));
const useQuery_1 = require("@/hooks/useQuery");
const moment_1 = __importDefault(require("moment"));
const Achieve = ({ tags, posts: initPosts }) => {
    const router = router_1.useRouter();
    const { query, jumpTo, getQuery } = useQuery_1.useQuery();
    const tag = getQuery("tag") || "";
    const pageNo = getQuery("pageNo") * 1 || 1;
    const pageSize = getQuery("pageSize") || 10;
    const [loading, setLoading] = react_1.useState(false);
    const [posts, setPosts] = react_1.useState(initPosts);
    react_1.useEffect(() => {
        (async () => {
            setLoading(true);
            const resp = await api_1.default.request({
                url: `/post?pageSize=${pageSize}&pageNo=${pageNo}&tag=${encodeURI(tag)}`,
            });
            setLoading(false);
            setPosts(resp.data.data);
        })();
    }, [pageNo, pageSize, tag]);
    return (<div id="achieve-wrapper">
      <head_1.default>
        <title>归档</title>
        <meta property="og:title" content="My page title" key="about"/>
      </head_1.default>
      <Layout_tsx_1.default>
        <antd_1.Card bordered={false}>
          <antd_1.List size="small" header={<div className="tags">
                <customTag_1.default key="total" className={classnames_1.default({ active: tag === "" })} handleClick={() => {
        query.set("tag", "");
        query.set("pageNo", "1");
        jumpTo(query);
    }}>
                  全部 ({tags.total})
                </customTag_1.default>
                {tags.data.map((t) => (<customTag_1.default key={t.name} className={classnames_1.default({ active: tag === t.name })} handleClick={() => {
        query.set("tag", t.name);
        query.set("pageNo", "1");
        jumpTo(query);
    }}>
                    {t.name} ({t.count})
                  </customTag_1.default>))}
              </div>} 
    // footer={<div>Footer</div>}
    bordered={false} dataSource={posts.rows} loading={loading} renderItem={(item) => (<antd_1.List.Item extra={<antd_1.Space>
                    <span className="time">
                      发布于：
                      {moment_1.default(new Date(item.updatedAt).valueOf()).format(_slug_1.dateFormat)}
                    </span>
                  </antd_1.Space>}>
                <link_1.default href={`/article/${item.id}`}>
                  <a>{item.title}</a>
                </link_1.default>
              </antd_1.List.Item>)} pagination={{
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
    }}/>
        </antd_1.Card>
      </Layout_tsx_1.default>
    </div>);
};
Achieve.getInitialProps = async (ctx) => {
    const { req, query } = ctx;
    const resp = await Promise.all([
        api_1.default.request({ url: `/tags` }),
        api_1.default.request({
            url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}&tag=${encodeURI(query.tag || "")}`,
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
exports.default = Achieve;
//# sourceMappingURL=achieve.jsx.map