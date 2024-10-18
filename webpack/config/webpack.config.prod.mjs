'use strict';

/**
 * @file webpack.config.prod.mjs
 * @description Webpack 5 configuration for production builds with optimizations.
 *
 * @details
 * This configuration file sets up Webpack for production, focusing on optimizations such as
 * JavaScript and CSS minification, splitting chunks, and ensuring a performant output for deployment.
 * It is designed to work with ES Modules, and all imports are asynchronous to improve modularity 
 * and maintainability.
 *
 * Key functionalities:
 * 1. Define entry and output points for the production build.
 * 2. Asynchronously load external plugins, rules, and resolve configurations.
 * 3. Optimize JavaScript with TerserPlugin and CSS with css-minimizer-webpack-plugin.
 * 4. Enable split chunking for better caching and performance.
 * 5. Configure Webpack stats and performance hints for detailed logging and asset size constraints.
 * 6. Support for pnpm package management, ensuring unique chunk naming to avoid conflicts.
 *
 * @constant {string} __filename - Absolute file path of the current module.
 * @constant {string} __dirname - Directory name of the current module.
 *
 * @async
 * @function loadPlugins
 * @description Dynamically imports the Webpack plugins module for flexibility.
 * @returns {Promise<Array>} A promise resolving to an array of Webpack plugins.
 *
 * @async
 * @function loadRules
 * @description Dynamically imports the Webpack rules module to modularize rule definitions.
 * @returns {Promise<Array>} A promise resolving to an array of Webpack module rules.
 *
 * @async
 * @function loadResolve
 * @description Dynamically imports the Webpack resolve configuration to handle module resolution.
 * @returns {Promise<Object>} A promise resolving to the resolve object.
 *
 * @returns {Promise<Object>} A promise resolving to the Webpack production configuration object.
 *
 * @author Yagnik Vadi <yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-28
 * @updated 2024-10-07
 *
 * @usage
 * - Run Webpack in production mode to generate minified and optimized output.
 * - Modify entry, output, and resolve paths based on project structure.
 * - Ensure pnpm dependencies are correctly installed and compatible with split chunking configuration.
 *
 * @note
 * - This config focuses on high-performance production builds by utilizing modern JavaScript and CSS optimizations.
 * - It assumes a modular structure for Webpack configuration, where plugins, rules, and resolve settings are loaded dynamically.
 *
 * @see https://webpack.js.org/configuration/ for more details on Webpack configuration options.
 */

import path from 'path';
import cssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import { fileURLToPath } from 'url';

import paths from '../common/routes/paths.mjs';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asynchronously import plugins
const loadPlugins = async () => {
    const pluginsPath = path.resolve(__dirname, "..", "plugins/webpack.plugins.mjs");
    try {
        const module = await import(pluginsPath);
        return module.default || [];
    } catch (err) {
        console.error("Error loading plugins:", err);
        return [];
    }
};

// Asynchronously import rules
const loadRules = async () => {
    const rulesPath = path.resolve(__dirname, "..", "common/rules/webpack.rules.mjs");
    try {
        const module = await import(rulesPath);
        return module.default || [];
    } catch (err) {
        console.error("Error loading rules:", err);
        return [];
    }
};

// Asynchronously import resolve
const loadResolve = async () => {
    const resolvePath = path.resolve(__dirname, "..", "common/resolver/webpack.resolve.mjs");
    try {
        const module = await import(resolvePath);
        return module.default || {};
    } catch (err) {
        console.error("Error loading resolve:", err);
        return {};
    }
};

export default async () => {
    const plugins = await loadPlugins();
    const rules = await loadRules();
    const resolve = await loadResolve();

    return {
        mode: "production",
        entry: paths.appIndexJs,
        module: {
            rules,
        },
        output: {
            path: paths.appBuild,
            filename: "[name].[fullhash].js",
            chunkFilename: "[id].[chunkhash].js",
            clean: true,
        },
        plugins,
        resolve,
        stats: {
            // show the asset information
            assets: true,
            chunks: true,
            chunkModules: true,
            colors: true,
            env: true,

            // errors 
            errorDetails: true,
            errors: true,
            errorsCount: true,

            hash: true,
            logging: 'info',
            performance: true,
            timings: true,
            version: true,
        },
        optimization: {
            minimize: true,
            /**
             * Webpack minimizer configuration for optimizing and compressing JavaScript assets.
             *
             * @type {Array<Function>}
             */
            minimizer: [
                /**
                 * Applies TerserPlugin to minify and optimize JavaScript during the build process.
                 *
                 * @param {Object} compiler - Webpack's compiler object that processes the TerserPlugin.
                 */
                (compiler) => {
                    new TerserPlugin({
                        /**
                         * Enables parallel processing to improve performance by utilizing multiple CPU cores.
                         * This helps speed up the minification process.
                         *
                         * @type {boolean}
                         */
                        parallel: true,
                        terserOptions: {
                            parse: {
                                /**
                                 * Specifies the ECMAScript version used for parsing the input code.
                                 * ECMAScript 2023 (ECMAScript 14) is selected to support the latest JavaScript features.
                                 *
                                 * @type {number}
                                 */
                                ecma: 2023,
                            },

                            compress: {
                                /**
                                 * Defines the ECMAScript version for compression. Terser will ensure that 
                                 * the output conforms to ECMAScript 2023 (ES14), leveraging modern language features.
                                 *
                                 * @type {number}
                                 */
                                ecma: 2023,

                                /**
                                 * Disables warnings during compression, which helps to keep the output log clean.
                                 * Useful when minimizing non-critical messages.
                                 *
                                 * @type {boolean}
                                 */
                                warnings: false,

                                /**
                                 * Prevents certain comparison optimizations that could break code. 
                                 * This ensures that simplifying comparisons doesn't cause issues.
                                 *
                                 * @type {boolean}
                                 */
                                comparisons: false,

                                /**
                                 * Controls the inlining of function calls. A value of `2` allows more aggressive inlining,
                                 * where functions used multiple times may be inlined to optimize for performance.
                                 *
                                 * @type {number}
                                 */
                                inline: 2,
                            },

                            mangle: {
                                /**
                                 * Enables compatibility with Safari 10/11 by working around known issues with
                                 * block-scoped declarations (`let` and `const`), which are sometimes handled incorrectly.
                                 *
                                 * @type {boolean}
                                 */
                                safari10: true,
                            },

                            output: {
                                /**
                                 * Specifies the ECMAScript version for the output code. ECMAScript 2023 (ES14)
                                 * ensures that the final code uses the most modern syntax available.
                                 *
                                 * @type {number}
                                 */
                                ecma: 2023,

                                /**
                                 * Removes all comments from the output to reduce file size. This includes license comments,
                                 * which are typically kept but are removed here for a leaner output.
                                 *
                                 * @type {boolean}
                                 */
                                comments: false,

                                /**
                                 * Ensures that non-ASCII characters, such as emojis or certain Unicode symbols,
                                 * are encoded in the output. This guarantees compatibility with environments that 
                                 * only support ASCII characters.
                                 *
                                 * @type {boolean}
                                 */
                                ascii_only: true,
                            },
                        },
                    }).apply(compiler);
                },
                // This is only used in production mode
                // This plugin uses cssnano to optimize and minify your CSS.
                new cssMinimizerPlugin({
                    // cssNano optimizations options.
                    // Enable multi-process parallel running
                    parallel: 4,
                    // custom minifier clean-css
                    // https://github.com/clean-css/clean-css
                    minify: cssMinimizerPlugin.cleanCssMinify,
                    minimizerOptions: {
                        preset: [
                            "default",
                            {
                                discardComments: { removeAll: true },
                            },
                        ],
                    }
                }),
            ],
            runtimeChunk: true,
            splitChunks: {
                // include all types of chunks
                chunks: 'all',
                minSize: 20000,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    // Disabling this cache group.
                    // https://angular.love/webpack-an-in-depth-introduction-to-splitchunksplugin
                    default: false,
                    vendors: false,
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            // https://gist.github.com/davidgilbertson/838312f0a948423e4c4da30e29600b16
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                            // pnpm package names are URL-safe, but some servers don't like @ symbols
                            return `pnpm.${packageName.replace('@', '')}`;
                        },
                        priority: 20,
                    },
                    react: {
                        test: /[\\/]node_modules[\\/](@react|react|@react-dom|react-dom)[\\/]/,
                        name: "pnpm.react",
                        enforce: true,
                        chunks: "all",
                        priority: 30,
                    },
                    react_router: {
                        test: /[\\/]node_modules[\\/](@react-router-dom|react-router-dom)[\\/]/,
                        name: "pnpm.react-router",
                        enforce: true,
                        chunks: "all",
                        priority: 31,
                    },
                    materialUi: {
                        test: /[\\/]node_modules[\\/](@mui|@material-ui|material-ui)[\\/]/,
                        name: "pnpm.material-ui",
                        enforce: true,
                        chunks: "all",
                        priority: 32,
                    },
                    tanstackReactTable: {
                        test: /[\\/]node_modules[\\/](@tanstack|react-table)[\\/]/,
                        name: "pnpm.tanstackReactTable",
                        enforce: true,
                        chunks: "all",
                        priority: 33,
                    },
                    reduxToolkit: {
                        test: /[\\/]node_modules[\\/](@reduxjs|redux|@react-redux|react-redux|@redux-thunk|redux-thunk|@redux-saga|redux-saga)[\\/]/,
                        name: "pnpm.reduxToolkit",
                        enforce: true,
                        chunks: "all",
                        priority: 34,
                    },
                    reactHookForm: {
                        test: /[\\/]node_modules[\\/](@react-hook-form|react-hook-form)[\\/]/,
                        name: "pnpm.react-hook-form",
                        enforce: true,
                        chunks: "all",
                        priority: 35,
                    },
                    reactToastify: {
                        test: /[\\/]node_modules[\\/](@react-toastify|react-toastify)[\\/]/,
                        name: "npm.reactToastify",
                        enforce: true,
                        chunks: "all",
                        priority: 36,
                    },
                    styleComponents: {
                        test: /[\\/]node_modules[\\/](@styled-components|styled-components)[\\/]/,
                        name: "npm.styledComponents",
                        enforce: true,
                        chunks: "all",
                        priority: 37,
                    },
                    common: {
                        name: "common",
                        minChunks: 2,
                        chunks: "async",
                        priority: 10,
                        reuseExistingChunk: true,
                        enforce: true,
                    },
                },
            },
        },
        performance: {
            hints: 'error',               // 'warning' or false can also be used
            maxAssetSize: 500000,         // 500 KB max per asset
            maxEntrypointSize: 500000,    // 500 KB max per entry point
        },
    };
};
