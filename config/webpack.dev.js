'use strict';

import path from "path";
import webpack from "webpack";
import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Webpack configuration for the development environment.
 * This configuration is designed to enhance the development experience with features like hot module replacement and automatic browser opening.
 */
export default {
    /**
     * @constant {string} mode
     * The mode in which Webpack runs. 
     * It is set to "development" to enable features that are useful during development, such as detailed error messages and faster builds.
     */
    mode: "development",

    /**
     * @constant {Object} devServer
     * Configuration for Webpack's development server. 
     * The development server provides live reloading, hot module replacement, and other features to improve the development workflow.
     */
    devServer: {
        /**
         * @property {boolean} hot
         * Enables hot module replacement (HMR), which allows modules to be updated in the browser without a full refresh.
         */
        hot: true,

        /**
         * @property {boolean} open
         * Automatically opens the default web browser when the development server starts.
         */
        open: true,

        /**
         * @property {number} port
         * The port on which the development server will run.
         */
        port: 5114,

        /**
         * @property {boolean} compress
         * Enables gzip compression for everything served.
         */
        compress: true,

        /**
         * @property {string} webSocketServer
         * The type of WebSocket server to use for hot module replacement. Set to 'ws'.
         */
        webSocketServer: 'ws',

        /**
         * @property {boolean} historyApiFallback
         * When using the HTML5 History API, this option will enable history API fallback.
         */
        historyApiFallback: true,

        /**
         * @property {Object} client
         * Client-specific settings for the development server.
         */
        client: {
            /**
             * @property {boolean} progress
             * Shows a progress bar in the browser while rebuilding.
             */
            progress: true,

            /**
             * @property {number} reconnect
             * Number of reconnect attempts if the connection is lost.
             */
            reconnect: 5,

            /**
             * @property {string} logging
             * The logging level for Webpack's output. 
             * Controls the verbosity of logs during the build process.
             * - 'none' disables logging.
             * - 'error' only shows errors.
             * - 'warn' shows warnings and errors.
             * - 'info' shows informational messages, warnings, and errors (default).
             * - 'log' shows standard logs, warnings, and errors.
             * - 'verbose' shows everything including debugging information.
             */
            logging: 'info',

            /**
             * @property {string} webSocketTransport
             * The WebSocket transport type. Set to 'ws'.
             */
            webSocketTransport: 'ws',

            /**
             * @property {string} webSocketURL
             * The URL for WebSocket connections.
             */
            webSocketURL: 'ws://127.0.0.1:5114/ws',

            /**
             * @property {Object} overlay
             * Configuration for the overlay that displays runtime errors and warnings in the browser.
             */
            overlay: {
                /**
                 * @property {boolean} errors
                 * Displays errors in the browser overlay.
                 */
                errors: true,

                /**
                 * @property {boolean} warnings
                 * Displays warnings in the browser overlay.
                 */
                warnings: true,

                /**
                 * @property {boolean} runtimeErrors
                 * Displays runtime errors in the browser overlay.
                 */
                runtimeErrors: true,
            },
        },

        /**
         * @property {Object} devMiddleware
         * Middleware-specific settings for serving files from the Webpack build.
         */
        devMiddleware: {
            /**
             * @property {boolean} index
             * Whether to serve the index file for non-existing URLs.
             */
            index: true,

            /**
             * @property {Object} mimeTypes
             * Custom MIME types for serving files.
             */
            mimeTypes: { phtml: 'text/html' },

            /**
             * @property {string} publicPath
             * The public path that will be used to serve files from the Webpack build.
             */
            publicPath: path.resolve(__dirname, "..", "src/assets"),

            /**
             * @property {boolean} serverSideRender
             * Enables server-side rendering of files.
             */
            serverSideRender: true,

            /**
             * @property {boolean} writeToDisk
             * Whether to write the files to disk instead of only keeping them in memory.
             */
            writeToDisk: true,
        },
        // watchOptions: {
        //     aggregateTimeout: 300,
        //     poll: 1000,
        //     ignored: /node_modules/,
        // },
    },

    plugins: [
        /**
         * @constant {webpack.DefinePlugin} DefinePlugin
         * This plugin defines global constants that can be accessed in the application code.
         * It is used here to set `process.env.name` to "development", which can be utilized in the application
         * to enable or disable features specific to the development environment.
         * 
         * @param {Object} definitions - The object containing key-value pairs of global constants.
         * @param {string} definitions["process.env.name"] - The name of the environment, set to "development".
         */
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify("development"),
        }),
    ],
};
