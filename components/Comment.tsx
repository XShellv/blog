import { withRouter } from "next/router";
import Gitalk from "gitalk";
import { useEffect } from "react";

const Comment = () => {
  useEffect(() => {
    var gitalk = new Gitalk({
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

export default withRouter(Comment);
