'use strict';

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
