"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const gitalk_1 = __importDefault(require("gitalk"));
const react_1 = require("react");
const Comment = () => {
    react_1.useEffect(() => {
        var gitalk = new gitalk_1.default({
            clientID: "4f9f7108bdcdf6f189d3",
            clientSecret: "7e4cf761d6185adcfbfe021277f289ec60dd45cf",
            repo: "blog_comments",
            owner: "XShellv",
            admin: ["XShellv"],
            // id: this.props.router.query.id || this.props.router.pathname,
            distractionFreeMode: false,
        });
        gitalk.render("gitalk-container");
    }, []);
    return <div id="gitalk-container"></div>;
};
exports.default = router_1.withRouter(Comment);
//# sourceMappingURL=comment.jsx.map