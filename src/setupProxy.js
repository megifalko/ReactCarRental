const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/connect",
    createProxyMiddleware({
      target: "https://indentitymanager.snet.com.pl/",
      changeOrigin: true,
    })
  );
  app.use(
    "/vehicle",
    createProxyMiddleware({
      target: "https://mini.rentcar.api.snet.com.pl/",
      changeOrigin: true,
    })
  );
  app.use(
    "/vehicles",
    createProxyMiddleware({
      target: "https://mini.rentcar.api.snet.com.pl/",
      changeOrigin: true,
    })
  );
};
