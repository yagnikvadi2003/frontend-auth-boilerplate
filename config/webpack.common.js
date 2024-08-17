// import Dotenv from "dotenv-webpack";
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

import { fileURLToPath } from "url";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @constant {string} environment
 * The current environment in which the application is running.
 * It defaults to 'development' if the `NODE_ENV` environment variable is not set.
 */
const environment = process.env.NODE_ENV || 'development';

export default {
    /**
     * @property {string} entry
     * The entry point of the application where Webpack starts bundling.
     * This is typically the main file of your React application.
     */
    entry: path.resolve(__dirname, "..", "src/index.tsx"),

    /**
     * @property {Object} cache
     * Caching configuration for Webpack.
     * Enables persistent caching for faster rebuilds.
     */
    cache: {
        /**
         * @property {string} type
         * Defines the type of cache to use. Here, 'filesystem' caching is used to store
         * build dependencies and cache files on the disk.
         */
        type: 'filesystem',

        /**
         * @property {Object} buildDependencies
         * Specifies dependencies that affect the build. If any of these dependencies change,
         * Webpack will invalidate the cache and rebuild.
         */
        buildDependencies: {
            /**
             * @property {Array<string>} config
             * An array containing paths to configuration files that affect the build.
             * Webpack will invalidate the cache if any of these files change.
             */
            config: [__filename],
        },
    },

    /**
     * @property {Object} optimization
     * Optimization configuration for Webpack. 
     * Includes settings for minimizing output, splitting chunks, and other performance optimizations.
     */
    optimization: {
        /**
         * @property {boolean} concatenateModules
         * Enables module concatenation, which can improve runtime performance by reducing the total number of modules.
         */
        concatenateModules: true,

        /**
         * @property {boolean} emitOnErrors
         * Ensures that assets are emitted even when errors occur during the build process.
         */
        emitOnErrors: true,

        /**
         * @property {boolean} flagIncludedChunks
         * Flags modules and chunks as included, allowing Webpack to optimize and reduce the output size.
         */
        flagIncludedChunks: true,

        /**
         * @property {boolean} minimize
         * Enables code minimization to reduce the size of the output files.
         */
        minimize: true,

        /**
         * @property {Array<Object>} minimizer
         * Specifies the minimizers used by Webpack. Here, `TerserPlugin` is used to minimize JavaScript, TypeScript, and JSX files.
         */
        minimizer: [
            new TerserPlugin({
                /**
                 * @property {RegExp} test
                 * A regular expression that matches the files to be minimized.
                 */
                test: /\.(js|ts|tsx)(\?.*)?$/i,

                /**
                 * @property {Object} terserOptions
                 * Configuration options for Terser, the minification engine.
                 */
                terserOptions: {
                    /**
                     * @property {boolean} compress
                     * Enables code compression to reduce the output size.
                     */
                    compress: true,
                },

                /**
                 * @property {boolean} parallel
                 * Enables parallel processing to speed up the minification process.
                 */
                parallel: true,

                /**
                 * @property {boolean} extractComments
                 * Extracts comments from the minified code into a separate file.
                 */
                extractComments: true,
            })
        ],

        /**
         * @property {boolean} mangleWasmImports
         * Mangling WebAssembly imports to reduce the size of the output bundle.
         */
        mangleWasmImports: true,

        /**
         * @property {boolean} portableRecords
         * Enables portable records, making the build output more consistent across different environments.
         */
        portableRecords: true,

        /**
         * @property {boolean} realContentHash
         * Disables the use of real content hash, potentially improving build performance at the cost of cacheability.
         */
        realContentHash: false,

        /**
         * @property {boolean} removeAvailableModules
         * Removes modules that are already available in parent chunks from child chunks to reduce output size.
         */
        removeAvailableModules: true,

        /**
         * @property {Object} runtimeChunk
         * Splits out runtime code into a separate chunk, which helps in better caching and smaller initial downloads.
         */
        runtimeChunk: {
            /**
             * @property {Function} name
             * A function that generates the name for the runtime chunk based on the entry point name.
             */
            name: (entrypoint) => `runtime~${entrypoint.name}`,
        },

        /**
         * @property {boolean} sideEffects
         * Enables tree-shaking by marking modules as side-effect free, which helps in removing unused code.
         */
        sideEffects: true,

        /**
         * @property {Object} splitChunks
         * Configuration for splitting chunks, allowing Webpack to split large bundles into smaller ones.
         */
        splitChunks: {
            /**
             * @property {string} chunks
             * Determines which chunks will be optimized. 'async' optimizes only async chunks.
             */
            chunks: 'async',

            /**
             * @property {number} minSize
             * Minimum size for a chunk to be generated.
             */
            minSize: 20000,

            /**
             * @property {number} minRemainingSize
             * Ensures that the total size of remaining chunks is at least this value.
             */
            minRemainingSize: 0,

            /**
             * @property {number} minChunks
             * Minimum number of chunks that must share a module before splitting.
             */
            minChunks: 1,

            /**
             * @property {number} maxAsyncRequests
             * Maximum number of parallel requests for async chunks.
             */
            maxAsyncRequests: 30,

            /**
             * @property {number} maxInitialRequests
             * Maximum number of parallel requests for initial chunks.
             */
            maxInitialRequests: 30,

            /**
             * @property {number} enforceSizeThreshold
             * Size threshold that, if exceeded, enforces splitting of a chunk.
             */
            enforceSizeThreshold: 50000,

            /**
             * @property {Object} cacheGroups
             * Defines groups of chunks that should be split.
             */
            cacheGroups: {
                /**
                 * @property {Object} vendor
                 * Configuration for vendor chunks, which group together libraries from `node_modules`.
                 */
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                    priority: 1,
                    reuseExistingChunk: true,
                },

                /**
                 * @property {Object} defaultVendors
                 * Default configuration for splitting vendor chunks.
                 */
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },

                /**
                 * @property {Object} default
                 * Default configuration for splitting chunks.
                 */
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },

    /**
     * @property {Object} output
     * Configuration for the output of the bundled files.
     */
    output: {
        /**
         * @property {string} path
         * The directory where the output files will be placed.
         */
        path: path.resolve(__dirname, "..", "dist"),

        /**
         * @property {string} filename
         * The name of the output file, including a hash to ensure unique filenames.
         */
        filename: "[name].[fullhash].js",

        /**
         * @property {string} chunkFilename
         * The name of non-entry chunk files, including a hash to ensure uniqueness.
         */
        chunkFilename: "[name].[chunkhash].js",

        /**
         * @property {boolean} clean
         * Clean the output directory before each build, removing old files.
         */
        clean: true,
    },

    /**
     * @property {Object} resolve
     * Configuration for resolving module requests.
     */
    resolve: {
        /**
         * @property {Array<string>} extensions
         * An array of file extensions Webpack should resolve.
         */
        extensions: [".ts", ".tsx", ".js"],
    },

    /**
     * @property {Object} module
     * Configuration regarding modules in Webpack.
     */
    module: {
        /**
         * @property {Array<Object>} rules
         * Rules for handling different types of files.
         */
        rules: [
            {
                /**
                 * @property {RegExp} test
                 * A condition to match specific files (TypeScript and JavaScript files).
                 */
                test: /\.(ts|js)x?$/,

                /**
                 * @property {string} use
                 * The loader to use for transforming matched files.
                 */
                use: "ts-loader",

                /**
                 * @property {RegExp} exclude
                 * A condition to exclude specific files or directories from processing.
                 */
                exclude: /node_modules/,
            },
        ],
    },

    /**
     * @property {Array<Object>} plugins
     * An array of plugins to extend or customize Webpack's behavior.
     */
    plugins: [
        /**
         * @plugin {Dotenv} Dotenv
         * Loads environment variables from a `.env` file corresponding to the current environment.
         * - `path`: Specifies the path to the environment-specific file.
         * - `safe`: Ensures that required variables are present.
         * - `systemvars`: Allows loading system environment variables.
         * - `defaults`: Loads default variables from `.env` if not defined in environment-specific files.
         */
        // new Dotenv({
        //     path: `./.env.${environment}`, 
        //     safe: true, 
        //     systemvars: true, 
        //     defaults: true,
        // }),

        /**
         * @plugin {HtmlWebpackPlugin} HtmlWebpackPlugin
         * Simplifies creation of HTML files to serve your Webpack bundles.
         * - `template`: Path to the HTML template file to use.
         */
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "public/index.html"),
        }),
    ],

    /**
     * @property {Object} devServer
     * Configuration options for the Webpack development server.
     */
    devServer: {
        /**
         * @property {string} static
         * The directory from which to serve static files.
         */
        static: {
            directory: path.join(__dirname, '..', "dist"),
            watch: true,
        },
    },

    /**
     * @property {string} mode
     * Sets the mode for Webpack, which affects optimizations and output.
     * - Can be `development`, `production`, or `none`.
     */
    mode: environment,
};
