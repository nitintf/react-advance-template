const commonPaths = require('./common-paths')
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('react-dev-utils/ForkTsCheckerWarningWebpackPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('../.babelrc.json')
const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin');
const eslintConfig = require('../.eslintrc.js')

const serverVars = [
  'name'
];

// Add needed plugins here
const htmlPluginParams = {
  serverVars: serverVars,
  config: {},
  filename: 'index.html',
  alwaysWriteToDisk: true,
};

const config = {
  output: {
    path: commonPaths.outputPath,
    publicPath: '/assests/',
  },
  target: 'web',
  infrastructureLogging: {
    level: 'none',
  },
  optimization: {
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

            // npm package names are URL-safe, but @ symbols can cause errors
            return `npm.${packageName.replace('@', '')}`;
          },
        }
      }
    }
  },
  resolve: {
    alias: {
      app: commonPaths.appEntry
    },
    fallback: {
      url: false,
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
    }),
    new HtmlWebpackPlugin({
      templateParameters: htmlPluginParams,
      template: 'src/index.ejs',
      title: "React Starter By Nitin"
    }),
    new ESLintPlugin({
      baseConfig: eslintConfig,
      emitError: true,
      emitWarning: true,
      exclude: ['node_modules', 'dist', '__test__'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      failOnError: true,
      failOnWarning: false,
      fixTypes: ['layout', 'problem', 'suggestion'],
      fix: true,
      useEslintrc: true
    })
  ],
  module: {
    noParse: /tangram\/dist\/tangram/,
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: commonPaths.appEntry,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.css$/,
        include: commonPaths.appEntry,
        use: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          {
            loader: 'style-loader',
          },
        ],
      },
      {
        test: /\.sass/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
                indentedSyntax: true,
              },
            },
          },
        ],
      },
      {
        test: /app\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
        ],
      },
      {
        test: /\.scss/,
        exclude: /app\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.join(__dirname, '/../src/styles/variables.scss'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)/,
        use: 'url-loader?limit=8192',
      },
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        use: 'file-loader',
      },
    ],
  }
}

module.exports = config
