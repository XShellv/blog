"use strict";
const axios = require("axios");
const base_url = "http://localhost:3000";
axios.defaults.withCredentials = true;
const isServer = typeof window === "undefined";
async function request({ method = "GET", url, data = {} }, req, res) {
    if (!url) {
        throw Error("url must provide");
    }
    url = "/api" + url;
    if (isServer) {
        const headers = {};
        return await axios({
            method,
            url: `${base_url}${url}`,
            data,
            headers,
        });
    }
    else {
        return await axios({
            method,
            url,
            data,
        });
    }
}
module.exports = {
    request,
};
//# sourceMappingURL=api.js.map