'use strict';

const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const paths = require('./paths');
const getCSSModuleLocalIdent = require('./getCSSModuleLocalIdent');

// style files regexes
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

const host = process.env.HOST || 'localhost';

// Force development NODE_ENV for babel-preset-react-app
// babel loader.
process.env.NODE_ENV = 'production';

const isEnvProduction = false;
const isEnvDevelopment = true;

// common function to get style loaders
const getStyleLoaders = (cssOptions) => {

  const loaders = [
    isEnvDevelopment && require.resolve('style-loader'),
    isEnvProduction && {
      loader: MiniCSSExtractPlugin.loader,
      options: {
        publicPath: '../../',
      },
    },
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3,
          }),
        ]
      },
    }
  ].filter(Boolean);

  return loaders;
};

module.exports = {
  mode: isEnvProduction ? 'production' : 'development',

  // Entry point of application
  entry: [
    paths.appIndexJs
  ],

  output: {

    // The build folder
    path: isEnvProduction ? paths.appBuild : undefined,

    // Development does not produce real files.
    filename: isEnvProduction ? 'static/js/[name].[chunkhash:8].js' : 'static/js/bundle.js',

    // Additional JS chunks if code splitting
    chunkFilename: 'static/js/[name].chunk.js',
  },

  optimization: {
    minimize: isEnvProduction,
    minimizer: [
      // Only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          },
        },
        parallel: true,
        cache: true,
      }),

      // Only used in production mode
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          parser: safePostCssParser,
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
    ],
    // splitChunks: {
    //   chunks: 'all',
    //   name: false,
    // },
    runtimeChunk: true,
  },

  devServer: {

    contentBase: paths.appPublic,

    watchContentBase: true,

    open: true,

    // Enable gzip compression generated files
    compress: true,

    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    hot: true,

    host,

    publicPath: '/',

    port: 3000,

    historyApiFallback: {
      disableDotRule: true,
    },
  },

  resolve: {
    extensions: paths.moduleFileExtensions
      .map(ext => `.${ext}`),
  },

  module: {
    // Makes missing exports an error instead of a warning
    strictExportPresence: true,

    rules: [
      {
        oneOf: [

          // Process application JS with Babel.
          // The preset includes JSX, Flow, TypeScript, and some ESnext features.
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: 'babel-loader',
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),
              babelrc: false,
              configFile: false,
              presets: [require.resolve('babel-preset-react-app')],

              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: isEnvProduction,
              compact: isEnvProduction,
            },
          },

          // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use MiniCSSExtractPlugin to extract that CSS
          // to a file, but in development "style" loader enables hot editing
          // of CSS.
          // By default we support CSS Modules with the extension .module.css
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
            }),

            // Tree shake CSS
            sideEffects: true
          },


          // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
          // using the extension .module.css
          {
            test: cssModuleRegex,
            use: getStyleLoaders({
              importLoaders: 1,
              modules: true,
              getLocalIdent: getCSSModuleLocalIdent,
            }),
          },
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          }
        ]
      }
    ]
  },

  plugins: [

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
      Object.assign(
        {},
        {
          inject: true,
          template: paths.appHtml
        },
        isEnvProduction ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        } : undefined
      )
    ),

    // Makes some environment variables available to the JS code
    new webpack.DefinePlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      PUBLIC_URL: paths.appPublic,
    }),

    // This is necessary to emit hot updates (currently CSS only):
    isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),

    isEnvProduction &&
      new MiniCSSExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
      }),
  ].filter(Boolean),
}