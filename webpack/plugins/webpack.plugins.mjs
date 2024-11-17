'use strict';

/**
 * @file webpack.plugins.mjs
 * @description Webpack 5 plugin configurations for build optimization and asset management.
 *
 * @details
 * This module defines an array of plugins that Webpack uses to extend its core functionalities.
 * These plugins optimize the build process, manage assets, and inject environment variables. 
 * The configuration adapts for both development and production environments, ensuring an efficient
 * build pipeline while handling HTML, CSS, JavaScript, and other assets.
 *
 * Key functionalities:
 * 1. **HtmlWebpackPlugin**: Generates an `index.html` file with the necessary `<script>` tags 
 * injected, making it easier to manage HTML templates during development and production.
 * 
 * 2. **ModuleNotFoundPlugin**: Provides better context for module not found errors, helping developers 
 * locate issues in the build pipeline with detailed error reporting.
 * 
 * 3. **DefinePlugin**: Makes environment variables available globally in the application, allowing 
 * conditional behavior based on environment (`development`, `production`, etc.).
 * 
 * 4. **MiniCssExtractPlugin**: Extracts CSS into separate files rather than inline, which improves 
 * caching and load performance in production environments.
 * 
 * 5. **InterpolateHtmlPlugin**: Replaces placeholders (like `%PUBLIC_URL%`) in HTML files with the 
 * correct values, ensuring consistent asset paths during both development and production.
 * 
 * 6. **CompressionPlugin**: Compresses assets using Gzip, reducing the file size of JavaScript and CSS 
 * files in production builds, improving performance by speeding up resource delivery.
 * 
 * 7. **CopyPlugin**: Copies assets from the `public` folder to the output directory during the build 
 * process, ensuring static files like favicon and images are included in the build.
 * 
 * 8. **MinChunkSizePlugin**: Minimizes the size of chunks to improve caching behavior by breaking 
 * up large files into smaller ones.
 * 
 * 9. **ProvidePlugin**: Ensures certain dependencies, like `process` in browser environments, are 
 * polyfilled or globally available without explicitly importing them, avoiding runtime errors.
 *
 * @constant {Object[]} plugins - An array of Webpack plugin objects for enhancing the build process.
 * @property {Object} HtmlWebpackPlugin - Plugin for generating and injecting scripts into `index.html`.
 * @property {Object} ModuleNotFoundPlugin - Improves error reporting for missing modules.
 * @property {Object} DefinePlugin - Injects global environment variables into the application.
 * @property {Object} MiniCssExtractPlugin - Extracts CSS into separate files for production builds.
 * @property {Object} InterpolateHtmlPlugin - Handles variable interpolation in HTML templates.
 * @property {Object} CompressionPlugin - Gzip compression for JavaScript and CSS files in production.
 * @property {Object} CopyPlugin - Copies static files to the output directory.
 * @property {Object} MinChunkSizePlugin - Ensures smaller chunk sizes for better caching.
 * @property {Object} ProvidePlugin - Provides polyfills or globals for specific dependencies like `process`.
 *
 * @example
 * * Example configuration for MiniCssExtractPlugin
 * new MiniCssExtractPlugin({
 *   filename: "static/css/[name].[contenthash:8].css",
 *   chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
 * });
 *
 * @returns {Object[]} An array of Webpack plugins.
 *
 * @author Yagnik Vadi <yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-09-26
 * @updated 2024-10-01
 *
 * @usage
 * - Import this module into your Webpack configuration to enable the defined plugins.
 * - Modify or extend the plugin configurations to meet your specific build requirements.
 *
 * @note
 * Ensure that each plugin is properly installed and configured to avoid build errors.
 *
 * @see https://webpack.js.org/plugins/ for more information on configuring plugins.
 */

import path from 'path';
import { fileURLToPath } from 'url';

import webpack from "webpack";
import WebpackBuildNotifierPlugin from "webpack-build-notifier";
import CopyPlugin from "copy-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import ModuleNotFoundPlugin from 'react-dev-utils/ModuleNotFoundPlugin.js';
import InterpolateHtmlPlugin from 'react-dev-utils/InterpolateHtmlPlugin.js';

import getClientEnvironment from "../common/environment/env.mjs";
import { inDev } from "../common/helpers/webpack.helpers.mjs";
import paths from "../common/routes/paths.mjs";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

const plugins = [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin(
        Object.assign(
            {},
            {
                inject: true,
                title: "InterfaceGuard",
                template: paths.appHtml,
            },
            !inDev()
                ? {
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
                    },
                }
                : undefined
        )
    ),

    // !Note: Some systems may need notification permissions to be enabled for these to appear. Check your system’s notification settings 
    // !if they don’t display.
    inDev() && new WebpackBuildNotifierPlugin({
        title: "Interface Guide",
        logo: path.resolve(__dirname, "..", "..", "public/favicon.ico"),
        suppressSuccess: true, // don't spam success notifications
        suppressWarning: true, // Shows notifications for warnings
        sound: "Funk", // Plays a sound for build notifications; options include: "Funk", "Basso", "Glass", etc.
        successSound: "Submarine", // Sound for successful builds
        failureSound: "Hero", // Sound for failed builds
        warningSound: "Blow", // Sound for warnings
        showDuration: true, // Displays build duration in notifications
    }),

    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),

    !inDev() && new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:8].css",
        chunkFilename: "static/css/[id].[contenthash:8].chunk.css",
    }),

    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
    // It will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),

    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000,
    }),

    !inDev() && new CompressionPlugin(),

    new CopyPlugin({
        patterns: [
            {
                from: "public/favicon.ico",
                to: paths.appBuild,
            },
            { from: "public", to: "public" },
        ],
        options: {
            concurrency: 100,
        },
    }),

    new webpack.ProvidePlugin({
        // https://stackoverflow.com/a/65018686/14239942
        // handle Uncaught ReferenceError: process is not defined
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
    }),
].filter(Boolean);

// Ensure plugins is an array
if (!Array.isArray(plugins)) {
    throw new TypeError("Expected 'plugins' to be an array.");
}

export default plugins;
