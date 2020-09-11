import * as React from "react";
import { Tag } from "antd";
import classNames from "classnames";

const CustomTag: React.FC<{
  handleClick?: () => void;
  className?: string;
}> = ({ children, handleClick, className, ...rest }) => {
  return (
    <Tag
      className={classNames("customTag", className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Tag>
  );
};
export default CustomTag;
