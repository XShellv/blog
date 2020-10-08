"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("lib/api"));
const react_1 = __importDefault(require("react"));
const customList_1 = __importDefault(require("@/components/customList"));
exports.dateFormat = "YYYY-MM-DD HH:mm:ss";
const Index = (props) => {
    return <customList_1.default {...props}/>;
};
Index.getInitialProps = async (ctx) => {
    const { req, query, res } = ctx;
    // if (res) {
    //   res?.writeHead(302, {
    //     Location: login,
    //   });
    //   res?.end();
    // } else {
    //   Router.replace(login);
    // }
    const resp = await api_1.default.request({
        url: `/post?pageSize=${query.pageSize || 10}&pageNo=${query.pageNo || 1}`,
    });
    return {
        list: resp.data.data,
    };
};
exports.default = Index;
//# sourceMappingURL=index.jsx.map