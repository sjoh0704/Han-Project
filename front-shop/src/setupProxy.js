const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
    app.use(
        "/apis",
        createProxyMiddleware({
            target: process.env["REACT_APP_BASE_URL"] || "http://localhost:82",
            changeOrigin: true,
        })
    );
    // app.use(
    //     "/ws",
    //     createProxyMiddleware({
    //         target: process.env["REACT_APP_SOCKET_URL"] || "http://auction-service.default.svc:8080",
    //         changeOrigin: true,
    //         ws: true,
    //     })
    // );
};
