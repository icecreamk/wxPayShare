module.exports = {
  devServer: {
    host: "m.kkk.com",
    port: 80,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        ws: false,
        /**
         * changeOrigin: true
         * /api/test
         * http://localhost:5000/test
         * changeOrigin: false
         * /api/test
         * http://localhost:5000/api/test
         */
        changeOrigin: false,
      },
    },
  },
};
