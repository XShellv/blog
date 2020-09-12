"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __importDefault(require("next/link"));
const antd_1 = require("antd");
const Layout_tsx_1 = __importDefault(require("@/layout/Layout.tsx"));
const CustomTag_tsx_1 = __importDefault(require("@/components/CustomTag.tsx"));
const useQuery_1 = require("@/hooks/useQuery");
const api_1 = __importDefault(require("lib/api"));
const react_1 = require("react");
const moment_1 = __importDefault(require("moment"));
const router_1 = require("next/router");
exports.dateFormat = "YYYY-MM-DD HH:mm:ss";
const Home = ({ initList }) => {
    const { query, getQuery, jumpTo } = useQuery_1.useQuery();
    const [list, setList] = react_1.useState(initList);
    const pageNo = getQuery("pageNo") * 1 || 1;
    const pageSize = getQuery("pageSize") || 10;
    const [loading, setLoading] = react_1.useState(false);
    react_1.useEffect(() => {
        (async () => {
            setLoading(true);
            const resp = await api_1.default.request({
                url: `/post?pageSize=${pageSize || 10}&pageNo=${pageNo || 1}`,
            });
            setLoading(false);
            setList(resp.data.data);
        })();
    }, [pageNo, pageSize]);
    return (<div id="home-wrapper">
      <Layout_tsx_1.default>
        <antd_1.List bordered={false} size="small" loading={loading} dataSource={list.rows} renderItem={(row) => (<antd_1.List.Item key={row.title}>
              <ArticleCard key={row.title} {...row}/>
            </antd_1.List.Item>)} pagination={{
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
    }}/>
      </Layout_tsx_1.default>
    </div>);
};
Home.getInitialProps = async (ctx) => {
    const { req, query } = ctx;
    const resp = await api_1.default.request({
        url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
    });
    return {
        initList: resp.data.data,
    };
};
const ArticleCard = (props) => {
    const { abstract, title, content, category, like, read, updatedAt, tags, id, } = props;
    const router = router_1.useRouter();
    return (<div className="list-item">
      <h1 className="home-card-title">
        <link_1.default href={`/article/${id}`}>
          <a>{title}</a>
        </link_1.default>
      </h1>
      <div className="home-card-extra">
        
        <div className="tags">
          {tags.map((tag) => (<CustomTag_tsx_1.default key={tag.name} handleClick={() => router.push({
        pathname: "/achieve",
        query: { tag: tag.name },
    })}>
              {tag.name}
            </CustomTag_tsx_1.default>))}
        </div>
        <div className="extra">
          <span className="time">
            发布于：{moment_1.default(new Date(updatedAt).valueOf()).format(exports.dateFormat)}
          </span>
        </div>
      </div>
      
      <p className="home-card-abstract">{abstract}</p>
    </div>);
};
exports.default = Home;
//# sourceMappingURL=index.jsx.map