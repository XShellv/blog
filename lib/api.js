const axios = require("axios");
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // if (error.response.status === 401) {
    //   return error.response;
    // }
    return Promise.reject(error);
  }
);

const isServer = typeof window === "undefined";
async function request({ method = "GET", url, data = {} }, ctx) {
  if (!url) {
    throw Error("url must provide");
  }
  if (isServer) {
    const headers =
      ctx && ctx.req && ctx.req.headers.cookie
        ? { cookie: ctx.req.headers.cookie }
        : undefined;
        console.log(`${process.env.HOST}${url}`,'KKKKKKKKKKKK')
    return await axios({
      method,
      url: `${process.env.HOST}${url}`,
      data,
      headers,
    });
  } else {
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
