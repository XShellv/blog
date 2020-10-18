import * as React from "react";
import { Spin, Tag } from "antd";
import classNames from "classnames";

interface IPageLoading {
  _style?: React.CSSProperties;
}
const PageLoading: React.FC<IPageLoading> = ({ _style }) => {
  const style: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(255,255,255,.3)",
    zIndex: 99999,
  };
  return (
    <div style={Object.assign(style, _style)}>
      <Spin size="small" tip="加载中..." />
    </div>
  );
};
export default PageLoading;
