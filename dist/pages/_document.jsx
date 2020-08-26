"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = __importStar(require("next/document"));
class MyDocument extends document_1.default {
    static async getInitialProps(ctx) {
        const initialProps = await document_1.default.getInitialProps(ctx);
        return Object.assign({}, initialProps);
    }
    render() {
        return (<document_1.Html>
        <document_1.Head>
          <link rel="icon" type="image/png" href="/static/favicon.png"/>
        </document_1.Head>
        <body>
          <document_1.Main />
          <document_1.NextScript />
        </body>
      </document_1.Html>);
    }
}
exports.default = MyDocument;
//# sourceMappingURL=_document.jsx.map