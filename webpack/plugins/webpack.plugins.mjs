'use strict';

/**
 * @file webpack.plugins.mjs
 * @description Webpack configuration for managing plugins
 *
 * @details
 * This module exports an array of Webpack plugins that enhance the
 * bundling process and optimize the output for both development 
 * and production environments. It includes essential plugins for 
 * HTML generation, CSS extraction, compression, and chunk optimization.
 *
 * Key functionalities:
 * 1. Use HtmlWebpackPlugin to generate an HTML file for the project 
 *    based on a specified template.
 * 2. Utilize MiniCssExtractPlugin to separate CSS into its own 
 *    file, optimizing load times for styles.
 * 3. Implement webpack.optimize.MinChunkSizePlugin to minimize 
 *    the size of chunks.
 * 4. Configure CompressionPlugin to compress output files 
 *    (JavaScript, CSS, HTML) using Gzip compression.
 * 5. Optionally include Brotli compression for improved file 
 *    sizes (commented out in this implementation).
 *
 * @constant {string} __filename - Absolute file path of the current module.
 * @constant {string} __dirname - Directory name of the current module.
 * @constant {Array<Object>} plugins - An array of instantiated 
 *    Webpack plugins for the build process.
 *
 * @returns {Array<Object>} An array of configured Webpack plugins.
 *
 * @author Yagnik Vadi<yagnikvadi8@gmail.com>
 * @version 1.0.0
 * @created 2024-08-27
 * @updated 2024-09-26
 *
 * @usage
 * - Add or remove plugins as needed to adjust the build process.
 * - Ensure the appropriate plugins are installed via npm/yarn 
 *   before using them in the configuration.
 *
 * @note
 * This configuration is filtered to remove any undefined values 
 * from the plugins array. Ensure that environment variables are 
 * set correctly to enable or disable certain plugins as required.
 *
 * @see https://webpack.js.org/plugins/ for more information on 
 * Webpack plugins and their configurations.
 */

import webpack from "webpack";
import path from "path";
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import { fileURLToPath } from "url";
import { inDev } from "../common/helpers/webpack.helpers.mjs";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
    new HtmlWebpackPlugin({
        title: "InterfaceGuard",
        template: path.resolve(__dirname, "..", "..", "public/index.html"),
    }),
    new MiniCssExtractPlugin({
        filename: inDev() ? "[name].css" : "[name].[chunkhash].css",
        chunkFilename: inDev() ? "[name].chunk.css" : "[name].[chunkhash].chunk.css",
    }),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000, // Minimum number of characters
    }),
    new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
    }),
    // new CompressionPlugin({
    //     filename: "[path][base].br",
    //     algorithm: "brotliCompress",
    //     test: /\.(js|css|html|svg)$/,
    //     compressionOptions: {
    //         params: {
    //             [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
    //         },
    //     },
    //     threshold: 10240,
    //     minRatio: 0.8,
    // }),
].filter(Boolean);

// Ensure plugins is an array
if (!Array.isArray(plugins)) {
    throw new TypeError("Expected 'plugins' to be an array.");
}

export default plugins;
