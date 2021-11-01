const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/API',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
            pathRewrite: {
                "^/API": "/"
            }
        })
    );

};