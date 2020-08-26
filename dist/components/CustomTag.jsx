"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const antd_1 = require("antd");
const CustomTag = ({ children }) => {
    return (<antd_1.Tag className="customTag" color="red">
      {children}
    </antd_1.Tag>);
};
exports.default = CustomTag;
//# sourceMappingURL=CustomTag.jsx.map