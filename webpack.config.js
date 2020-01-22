// const afterBuild = require("./afterBuild");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EventHooksPlugin = require("event-hooks-webpack-plugin");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
require('colors')

process.traceDeprecation = true

console.log(`config loaded successful, process.env = ${process.env.NODE_ENV}`.blue);
// colors.disable();

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: path.join(__dirname, "./dist"),
    // assets: "js/"
};

// let tpl = nodeTools.getFiles("./src/js/oais/tpl", /\.(pug|html)$/);

// if (!process.env.NODE_ENV) {
//     process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
// }

// sudo killall -9 -r node

function resolve(dir) {
    // console.log(path.join(__dirname, '.', dir))
    return path.join(__dirname, ".", dir);
}

let plugins = [
    new HtmlWebpackPlugin({
        template: `./public/index.html`,
        filename: `index.html`,
        favicon: './public/favicon.ico',
        inject: true,
    }),

    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(["dist"], {
        verbose: true,
        beforeEmit: true
        // dry: true
        // dry: process.env.NODE_ENV === "production" ? false : true
    }),
    new MiniCssExtractPlugin({
        filename: "css/[name].css"
        // filename: "/dist[name].css",
        // chunkFilename: "[name].css"
    }),
    new webpack.ProvidePlugin({
        // $: 'jquery',
        // jQuery: 'jquery',
        // 'window.jQuery': 'jquery',
    }),
    // new webpack.optimize.ModuleConcatenationPlugin()
    // new webpack.HotModuleReplacementPlugin()
];

if (process.env.MODE === "analyze") {
    console.log(`config loaded successful, process.MODE = ${process.env.MODE}`.red);
    plugins.push(
        new BundleAnalyzerPlugin()
    )
}

if (process.env.NODE_ENV === "production") {
    plugins.push(
        new EventHooksPlugin({
            // https://www.npmjs.com/package/event-hooks-webpack-plugin
            // https://webpack.js.org/api/compiler-hooks/
            done: () => {
                console.log(`build complete!!!`.green);
                // if (afterBuild) {
                //   afterBuild.Run(process.env.NODE_ENV, PATHS)
                // }
            }
        })
    );
}

module.exports = {
    // stats: 'verbose',
    stats: {
        // assets: false
        builtAt: false,
        children: false,
        cachedAssets: false,
        chunks: false,
        excludeAssets: [
            // 'filter',
            'tpl',
            // /filter/,
            // (assetName) => assetName.contains('tpl')
        ],
        entrypoints: false,
        // outputPath: false,
        // moduleTrace: false,
        logging: false
        // context: '/src/js/oais/'
    },
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {

                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }

                // vendor: {
                //     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                //     name: 'vendors',
                //     chunks: 'all',
                //     enforce: true
                // }
            }
        }
    },
    // mode: "none",
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [resolve(__dirname, './src'), 'node_modules'],
        alias: { // usade in import
            src: path.resolve(__dirname, './src'),
            components: path.resolve(__dirname, './src/components'),
            fixtures: path.resolve(__dirname, './src/fixtures'),
            assets: path.resolve(__dirname, './src/assets'),
            // fonts: path.resolve(__dirname, './src/assets/fonts'),
            // Templates: path.resolve(__dirname, 'src/templates/')
        }
    },
    mode: process.env.NODE_ENV,
    entry: {
        index: "./src/index.js",
        // main: "./src/main.js",
    },
    devtool: process.env.NODE_ENV === "production" ? "none" : "inline-source-map",
    devServer: {
        historyApiFallback: true,
        // hot:true,
        // writeToDisk: filePath => {
        //   return /\.(css|pug|html)$/.test(filePath);
        // },

        // proxy: {
        //     "/": {
        //         // host: "0.0.0.0",
        //         contentBase: "./dist",
        //         secure: false,
        //         autoRewrite: true,
        //         headers: {
        //             "X-ProxiedBy-Webpack": true
        //         },
        //
        //         target: "http://pisrv04.azot.kmr:8093",
        //         // target: 'http://pisrv04.azot.kmr:8093/Scheme/ViewSvgScheme/',
        //         // target: 'http://eportal4.azot.kmr',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             // '': 'main',
        //             // '/Content/profile.css': '/src/assets/oais/dev.css',
        //             // '^/catalog': '',
        //         },
        //         bypass(req) {
        //             // console.log(req.url)
        //             if (req.url === "/Scripts/AppScripts/StepValidator.js") {
        //                 // !!!
        //                 return "/oaisMain.js"; // точка входа в локальный скрипт
        //             } else if (req.url.includes("oais") || req.url.includes("init.js") || req.url.includes("node_modules")) {
        //                 // } else if (req.url.includes("oais") || req.url.includes("init.js") || req.url.includes("node_modules")) {
        //                 // console.log('include req.url')
        //                 // дальнейшаяя загрузка локальных скриптов
        //                 return req.url;
        //             }
        //         }
        //     }
        // }
    },
    output: {
        path: resolve("dist"),
        publicPath: "/",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                // exclude: /\.(main.css)/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            modules: true
                        }
                    },
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.(eot|woff2?|svg|ttf)$/,
                // loader: 'url-loader',
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name: ('fonts/[name].[ext]')
                }
            },
        ]
    },
    plugins: plugins
};
