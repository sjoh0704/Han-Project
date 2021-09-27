const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
    app.use(
        "/apis",
        createProxyMiddleware({
            target: process.env["REACT_APP_BASE_URL"] || "http://localhost:82",
            changeOrigin: true,
        })
    );
    app.use(
        "/socket.io",
        createProxyMiddleware({
            target: "AUCTION_SERVICE" || "http://172.17.0.2",
            changeOrigin: true,
            ws: true,
        })
    );
};
