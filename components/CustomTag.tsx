import * as React from 'react';
import { Tag } from "antd";

const CustomTag: React.FC = ({ children }) => {
  return (
    <Tag className="customTag" color="red">
      {children}
    </Tag>
  );
};
export default CustomTag;
