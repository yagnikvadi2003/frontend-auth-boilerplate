'use strict';

/**
 * @file webpack.rules.mjs
 * @description Webpack 5 configuration for module processing rules
 *
 * @details
 * This module defines an array of rules that Webpack uses to process various
 * types of files within the project. Each rule specifies the conditions under
 * which specific loaders should be applied to transform files before they are
 * bundled. The configuration aims to optimize the build process for both
 * development and production environments, providing a clear structure for
 * handling different file types such as HTML, CSS, images, fonts, and markdown.
 *
 * Key functionalities:
 * 1. Define loaders for handling `.html`, `.css`, `.scss`, and other file types.
 * 2. Configure asset management through loaders like `url-loader`, `file-loader`,
 *    and `MiniCssExtractPlugin`.
 * 3. Optimize file processing based on the current environment (development or production).
 *
 * @constant {Object[]} rules - An array of Webpack rule objects for processing files.
 * @property {RegExp} test - Regular expressions to match specific file extensions (e.g., `.html`, `.css`, `.png`).
 * @property {string[]} exclude - Paths or modules to exclude from processing (e.g., `node_modules`).
 * @property {Object[]} use - An array of loader objects used to transform matched files.
 * @property {Object} use.loader - The name of the loader to use (e.g., `html-loader`, `babel-loader`).
 * @property {Object} use.options - Options for the loader, controlling processing behavior.
 * @property {boolean} use.options.cacheDirectory - Enables caching for faster rebuilds in `babel-loader`.
 * @property {boolean} use.options.minimize - Minimizes the output in production mode.
 * @property {boolean} use.options.sourceMap - Enables source maps for debugging in development mode.
 * @property {string} generator.filename - Defines output filename patterns for assets (e.g., images or fonts).
 * @property {string} generator.publicPath - Public path for assets (e.g., `assets/images/`).
 * @property {string} generator.outputPath - Output directory for assets (e.g., `static/images/`).
 * @property {Object} parser - Parser settings for handling asset sizes and conditions.
 * @property {Object} parser.dataUrlCondition - Conditions for inlining files as Data URLs based on size.
 * @property {number} parser.dataUrlCondition.maxSize - Maximum file size (in bytes) for inlining.
 *
 * @example
 * // Example rule for handling `.html` files
 * {
 *   test: /\.html$/,
 *   exclude: /node_modules/,
 *   use: [
 *     {
 *       loader: "html-loader",
 *       options: {
 *         minimize: process.env.NODE_ENV === "production",
 *         esModule: false,
 *       }
 *     }
 *   ]
 * }
 *
 * @returns {Object[]} An array of Webpack rules.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-28
 * @updated 2024-09-26
 *
 * @usage
 * - Import this module in your Webpack configuration to utilize the defined rules.
 * - Modify or extend rules to accommodate additional file types or specific processing needs.
 *
 * @note
 * Ensure that each loader is properly installed and configured to avoid build errors.
 *
 * @see https://webpack.js.org/configuration/module/#rule for more information on configuring rules.
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
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                configFile: path.resolve(__dirname, "..", "..", "..", "babel.config.mjs"),
            },
        },
    },
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        // EX. ==> 1. example.svg 2. example.svg?v=1.2.3
        issuer: /\.([jt]sx|md|mdx)?$/,
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
