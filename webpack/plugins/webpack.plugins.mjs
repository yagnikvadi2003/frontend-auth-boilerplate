'use strict';

import path from "path";
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
].filter(Boolean);

// Ensure plugins is an array
if (!Array.isArray(plugins)) {
    throw new TypeError("Expected 'plugins' to be an array.");
}

export default plugins;
