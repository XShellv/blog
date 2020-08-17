import { forwardRef } from "react";

interface IMarkdownRenderer {
  html: string;
}
const MarkdownRenderer = forwardRef((props: IMarkdownRenderer, ref: any) => {
  const { html } = props;
  return (
    <div className="markdown-body">
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
});

export default MarkdownRenderer;
