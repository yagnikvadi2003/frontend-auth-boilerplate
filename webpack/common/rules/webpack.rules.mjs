'use strict';

/*
 *
 * This code snippet is defining an array of rules that will be used in a webpack configuration file to handle different types of assets and resources in a web application.
 * Each rule specifies a test to match file extensions, loaders to process those files, and any additional options or configurations needed for processing.
 *
 */

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { inDev } from "../helpers/webpack.helpers.mjs";

import path from 'path';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rules = [
    {
        test: /\.html$/i,
        exclude: /node_modules/,
        use: [
            {
                loader: "html-loader",
                options: {
                    sources: {
                        // Enables processing inside the <noscript> tag
                        scriptingEnabled: false,
                    },
                    minimize: inDev() ? false : true,
                    esModule: false,
                },
            }
        ],
    },
    {
        test: /\.css|s[ac]ss$/,
        use: [
            MiniCssExtractPlugin.loader,
            { loader: "style-loader" },
            {
                loader: "css-loader",
                options: {
                    sourceMap: !inDev(),
                },
            },
            {
                loader: "sass-loader",
                options: {
                    api: "modern-compiler",
                    webpackImporter: false,
                    sourceMap: !inDev(),
                    warnRuleAsWarning: true,
                },
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        config: false,
                        sourceMap: !inDev(),
                    },
                },
            },
        ],
    },
    {
        test: /\.[jt]sx$/,
        exclude: /(node_modules|\.webpack)/,
        use: [
            {
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: false
                }
            },
            {
                loader: "ts-loader",
            }
        ],
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // EX. ==> 1. example.svg 2. example.svg?v=1.2.3
        issuer: /\.([jt]sx|md|mdx)?$/,
        include: path.resolve(__dirname, "..", "..", "..", "src/assets/svgs"),
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                },
            },
            {
                loader: 'url-loader',
                options: {
                    limit: 6 * 1024, // 6 KB limit
                    name: inDev() ? "[path][name].[ext][query]" : '[name].[hash:8].[ext][query]',
                    publicPath: 'assets/svgs/',
                    outputPath: 'static/svgs/',
                },
            },
        ],
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 // 10 kb
            }
        },
    },
    {
        test: /\.(png|jpe?g|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        // EX. ==> 1. example.png 2. example.png?v=1.2.3
        exclude: /node_modules/,
        type: 'asset',
        generator: {
            filename: inDev() ? "[name][ext][query]" : "[hash][ext][query]",
            publicPath: 'assets/images/',
            outputPath: 'static/images/',
        },
        include: path.resolve(__dirname, "..", "..", "..", "src/assets/images"),
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024 // 10kb limit
            }
        },
    },
    {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
            {
                loader: 'file-loader',
                options: {
                    limit: 10 * 1024, // 10kb limit,
                    name: inDev() ? "[name][ext][query]" : "[hash][ext][query]",
                    outputPath: 'fonts/'
                }
            }
        ]
    },
    {
        test: /\.md$/,
        use: [
            {
                loader: "markdown-loader",
            },
        ],
    },
    {
        test: /\.mdx?$/,
        use: [
            {
                loader: '@mdx-js/loader',
            }
        ]
    }
];

// Ensure rules is an array
if (!Array.isArray(rules)) {
    throw new TypeError("Expected 'rules' to be an array.");
}

export default rules;
