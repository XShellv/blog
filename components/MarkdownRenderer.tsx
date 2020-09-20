import MyDocument from "pages/_document";
import { forwardRef } from "react";
const MarkdownIt = require("markdown-it");
const md = new MarkdownIt({
  html: true,
  linkify: true,
});

interface IMarkdownRenderer {
  content: string;
}
const MarkdownRenderer = forwardRef((props: IMarkdownRenderer, ref: any) => {
  const { content } = props;
  return (
    <div className="vditor-reset">
      <div ref={ref} dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </div>
  );
});

export default MarkdownRenderer;
