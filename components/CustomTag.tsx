import { Tag } from "antd";

const CustomTag: React.FC = ({ children }) => {
  return (
    <Tag color="#fff" className="tag">
      {children}
    </Tag>
  );
};
export default CustomTag;
