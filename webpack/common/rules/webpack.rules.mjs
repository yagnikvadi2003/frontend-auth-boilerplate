'use strict';

/*
 *
 * This code snippet is defining an array of rules that will be used in a webpack configuration file to handle different types of assets and resources in a web application.
 * Each rule specifies a test to match file extensions, loaders to process those files, and any additional options or configurations needed for processing.
 *
 */

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { inDev } from "../helpers/webpack.helpers.mjs";

const rules = [
    {
        test: /\.html|md$/i,
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
            },
            {
                loader: "markdown-loader",
            }
        ],
    },
    {
        test: /\.css|s[ac]ss$/,
        use: [
            { loader: inDev() ? "style-loader" : MiniCssExtractPlugin.loader },
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
                loader: inDev() ? "postcss-loader" : MiniCssExtractPlugin.loader,
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
        test: /\.[jt]sx|mdx$/,
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
            },
            {
                loader: '@mdx-js/loader',
            }
        ],
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // EX. ==> 1. example.svg 2. example.svg?v=1.2.3
        issuer: /\.([jt]sx|mdx)?$/,
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
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
            filename: inDev() ? "[name][ext][query]" : "[hash][ext][query]",
            publicPath: 'assets/images/',
            outputPath: 'static/images/',
        },
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
    }
];

// Ensure rules is an array
if (!Array.isArray(rules)) {
    throw new TypeError("Expected 'rules' to be an array.");
}

export default rules;
