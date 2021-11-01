const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/Seed/api/v1/resources/seed/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/apis',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
            pathRewrite: {
                "^/apis": "/Khariff_Prod/api/v1/resources/khariff_prod/all"
            }
        })
    );
    app.use(
        '/api/Fertilizer_Consumption/api/v1/resources/fertilizer_consumption/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/Reservoir/api/v1/resources/reservoir/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/Micro_Irrigation/api/v1/resources/area_under_micro_irrigation/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/Milk_Prduction/api/v1/resources/milk/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
    app.use(
        '/api/Eggs_Production/api/v1/resources/eggs/all',
        createProxyMiddleware({
            target: 'https://agri-dashboard.herokuapp.com/',
            changeOrigin: true,
        })
    );
};