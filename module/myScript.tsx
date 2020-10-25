const MyScript: React.FC = ({ children }) => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${children && children.toString()})();`,
    }}
  ></script>
);

export default MyScript;
