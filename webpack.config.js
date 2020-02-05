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
console.log(`config loaded successful, dev.env = ${process.env.DEV_ENV}`.green);
// colors.disable();

const dist = () => {
    let dist
    switch (process.env.DEV_ENV) {
        case 'flask':
        case 'oais':
        case 'wsgi':
            dist = path.join(__dirname, "./flask/project/static")
            break
        case 'php':
            dist = path.join(__dirname, "./public_html/static")
            break
    }
    console.log(`dist = ${dist}`.yellow);
    return dist
}

const clean = () => {
    let clean
    switch (process.env.DEV_ENV) {
        case 'local-docker':
        case 'wsgi':
        case 'flask':
        case 'php':
            clean = false
            break
        default:
            clean = true
    }
    console.log(`clean = ${clean}`.yellow);
    return clean
}

const templates = () => {
    let templates
    switch (process.env.DEV_ENV) {
        case 'flask':
        case 'oais':
        case 'wsgi':
            templates = path.join(__dirname, "./flask/project/templates")
            break
        case 'php':
            templates = path.join(__dirname, "./public_html")
    }
    // if (process.env.DEV_ENV === "flask") templates = path.join(__dirname, "./flask/project/templates")
    // if (process.env.DEV_ENV === "php") templates = path.join(__dirname, "./public_html")
    console.log(`templates = ${templates}`.yellow);
    return templates
}

const PATHS = {
    src: path.join(__dirname, "./src"),
    dist: dist(),
    // dist: path.join(__dirname, "./flask/project/static"),
    templates: templates(),
    // dist: path.join(__dirname, "./dist"),
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
        filename: process.env.NODE_ENV === "production" ? `${PATHS.templates}/index.html` : `index.html`,
        // filename: `index.html`,
        favicon: './public/favicon.ico',
        // inject: false,
        inject: true,
    }),

    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin([PATHS.dist], {
        // new CleanWebpackPlugin(["dist"], {
        verbose: true,
        beforeEmit: true,
        // dry: true
        // Simulate the removal of files
        dry: !clean()
        // dry: process.env.NODE_ENV === "production"
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

const target = (url = 'api') => {
    let target
    if (process.env.DEV_ENV === "php") target = `http://0.0.0.0:5005/${url}`
    if (process.env.DEV_ENV === "oais") target = `http://arm-pq.web.azot.kmr/${url}`
    if (process.env.DEV_ENV === "local-docker") target = `http://0.0.0.0:8900/${url}`
    if (process.env.DEV_ENV === "wsgi") target = `http://0.0.0.0:5000/${url}`
    console.log(`target = ${target}`.red);
    return target
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
            // components: path.resolve(__dirname, './src/components'),
            fixtures: path.resolve(__dirname, './src/fixtures'),
            assets: path.resolve(__dirname, './src/assets'),
            // fonts: path.resolve(__dirname, './src/assets/fonts'),
            // Templates: path.resolve(__dirname, 'src/templates/')
        }
    },
    mode: process.env.NODE_ENV,
    entry: {
        init: "./init.js",
        // index: "./src/oais/index.js",
        // main: "./src/main.js",
    },
    devtool: process.env.NODE_ENV === "production" ? "none" : "inline-source-map",
    devServer: {
        historyApiFallback: true,
        // contentBase: PATHS.dist,
        // host: 'localhost',
        // host: '0.0.0.0',
        // port: 8080,
        // hot:true,
        // writeToDisk: filePath => {
        //   return /\.(css|pug|html)$/.test(filePath);
        // },
        //     '/*': {
        //         target: "http://0808.ddns.net/",
        //         ws: false,
        //         changeOrigin: true
        //     }
        proxy: [{
            // https://sdk.gooddata.com/gooddata-ui/docs/4.1.1/ht_configure_webpack_proxy.html
            // https://webpack.js.org/configuration/dev-server/#devserverproxy
            context: ['/api'],
            // '/api': {
            target: target('api'),
            // target: "http://0.0.0.0:8900/api",
            // target: "http://0.0.0.0:5005/api",
            // target: "http://arm-pq.web.azot.kmr/api",
            pathRewrite: {'^/api': ''},
            ws: false,
            changeOrigin: true,
        },
            {
                context: ['/static/'],
                target: target('static'),
                // target: "http://0.0.0.0:8900/api",
                // target: "http://0.0.0.0:5005/api",
                // target: "http://arm-pq.web.azot.kmr/api",
                pathRewrite: {'^/static': ''},
                ws: false,
                changeOrigin: true,
            },

            // '/': {
            //     target: "http://arm-pq.web.azot.kmr/api",
            // },
            // proxy: "http://proxy.azot.kmr:3128",

            // target: "http://0.0.0.0:3001",
            // pathRewrite: {'^/api': ''},
            // ws: false,
            // changeOrigin: true,

            // '/': {
            //     //
            //     //     contentBase: "./flask/project/static",
            //     //     secure: false,
            //     //     autoRewrite: true,
            //     //     headers: {
            //     //         "X-ProxiedBy-Webpack": true
            //     //     },
            //     //
            //     //     // target: 'http://www.sds-azot.ru',
            //     //     // target: "http://pisrv04.azot.kmr:8093",
            //     target: 'http://www.google.com',
            //     //     // target: 'http://www.sds-azot.ru/ru/pasporta-kachestva',
            //     changeOrigin: true,
            //     ws: false,
            // }
            //     pathRewrite: {
            //         // '': 'main',
            //         // '/Content/profile.css': '/src/assets/oais/dev.css',
            //         // '^/catalog': '',
            //     },
            //
            //     bypass(req) {
            //         // console.log(req.url)
            //         if (req.url === "http://www.google-analytics.com/ga.js") {
            //             // !!!
            //             return "/oaisMain.js"; // точка входа в локальный скрипт
            //         } else if (req.url.includes("oais") || req.url.includes("init.js")) {
            //             // } else if (req.url.includes("oais") || req.url.includes("init.js") || req.url.includes("node_modules")) {
            //             console.log('include req.url')
            //             // дальнейшаяя загрузка локальных скриптов
            //             return req.url;
            //         }
            //     }
            // }
        ],

        // "/api": {
        // "http://arm-pq.web.azot.kmr/api/*": {
        // "arm-pq.web.azot.kmr/api": {
        //     target: "http://0.0.0.0:8900/api",
        // host: process.env.NODE_ENV === "production" ? "http://0.0.0.0:8900/api" : "http://arm-pq.web.azot.kmr/api",
        // host: process.env.NODE_ENV === "production" ? "http://0.0.0.0:8900/api" : "http://arm-pq.web.azot.kmr/api",
        // host: "http://arm-pq.web.azot.kmr/api",
        // contentBase: "./dist",
        // secure: false,
        // autoRewrite: true,
        // headers: {
        //     "X-ProxiedBy-Webpack": true
        // },
        //
        //         target: "http://pisrv04.azot.kmr:8093",
        //         // target: 'http://pisrv04.azot.kmr:8093/Scheme/ViewSvgScheme/',
        //         // target: 'http://eportal4.azot.kmr',
        // changeOrigin: true,
        // ws: false,
        // }
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
    output:
        {
            path: PATHS.dist,
            publicPath:
                process.env.NODE_ENV === "production" ? "/static/" : "/",
            filename:
                "[name].js",
        }
    ,
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
                use: [
                    // 'url-loader',
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: ('css/fonts/[name].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(pdf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 10000,
                            name: ('passports/[name].[ext]')
                        }
                    }
                ]
            },
        ]
    }
    ,
    plugins: plugins
}
;
