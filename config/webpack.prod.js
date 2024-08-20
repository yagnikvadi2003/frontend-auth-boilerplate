'use strict';

import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

/**
 * Webpack configuration for production build.
 * This configuration is optimized for performance and includes plugins for environment variable definition and code minimization.
 */
export default {
    /**
     * @constant {string} mode
     * The mode in which Webpack runs.
     * It is set to "production" to optimize the build for deployment, enabling optimizations like minification and tree-shaking.
     */
    mode: "production",

    /**
     * @constant {boolean|string} devtool
     * Controls if and how source maps are generated.
     * Source maps are disabled in production for smaller bundles and better performance.
     */
    devtool: false,

    plugins: [
        /**
         * @constant {webpack.DefinePlugin} DefinePlugin
         * This plugin defines global constants at compile time.
         * It is used to set environment-specific variables, such as `process.env.name`, which can be utilized in the application code.
         * 
         * @param {Object} definitions - The object containing key-value pairs of global constants.
         * @param {string} definitions["process.env.name"] - The name of the environment, set to "production".
         */
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify("production"),
        }),
    ],

    optimization: {
        /**
         * @constant {boolean} minimize
         * Indicates whether to minimize the output files.
         * Enabled in production to reduce file size by removing whitespace, comments, and other unnecessary code.
         */
        minimize: true,

        minimizer: [
            /**
             * @constant {TerserPlugin} TerserPlugin
             * A plugin used to minimize JavaScript files using Terser.
             * It is configured to drop console statements and remove comments for a cleaner, smaller output.
             * 
             * @param {Object} options - The options object for configuring TerserPlugin.
             * @param {Function} options.minify - Specifies the minification function to use.
             * @param {boolean} options.extractComments - Determines whether comments should be extracted to a separate file.
             * @param {boolean} options.parallel - Enables parallel processing to speed up the build process.
             * @param {RegExp} options.test - A regular expression that tests which files should be minified.
             * @param {Object} options.terserOptions - Additional options to configure Terser.
             * @param {Object} options.terserOptions.compress - Options for compressing the code.
             * @param {boolean} options.terserOptions.compress.drop_console - Removes `console` statements from the code.
             * @param {Object} options.terserOptions.output - Options for outputting the minified code.
             * @param {boolean} options.terserOptions.output.comments - Determines whether comments should be included in the output.
             */
            new TerserPlugin({
                minify: TerserPlugin.uglifyJsMinify,
                extractComments: true,
                parallel: true,
                test: /\.(ts|js)x?$/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};
