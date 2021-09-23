const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/Users/api/v1/resources/users/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
};