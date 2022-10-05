const commonPaths = require('./common-paths');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const port = process.env.PORT || 3001

const config = {
  mode: 'development',
  entry: {
    app: [`${commonPaths.appEntry}/index`, 'webpack-plugin-serve/client']
  },
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    assetModuleFilename: 'static/media/[name].[hash][ext]',
    publicPath: 'http://localhost:3001',
  },
  stats: {
    errorDetails: true
  },
  devtool: 'cheap-module-source-map',
  watch: true,
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'wds',
      }
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new Serve({
      historyFallback: {
        htmlAcceptHeaders: ["text/html", "*/*"],
        rewrites: []
      },
      liveReload: true,
      hmr: false,
      host: 'localhost',
      port: port,
      open: true,
      static: commonPaths.outputPath,
      status: true,
      progress: 'minimal',
      waitForBuild: true
    }),
  ],
}

module.exports = config
