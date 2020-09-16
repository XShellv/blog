"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const MarkdownRenderer = react_1.forwardRef((props, ref) => {
    const { html } = props;
    return (<div className="markdown-body">
      <div ref={ref} dangerouslySetInnerHTML={{ __html: html }}/>
    </div>);
});
exports.default = MarkdownRenderer;
//# sourceMappingURL=MarkdownRenderer.jsx.map