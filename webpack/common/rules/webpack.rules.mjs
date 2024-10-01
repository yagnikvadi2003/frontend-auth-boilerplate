'use strict';

/**
 * @file webpack.rules.mjs
 * @description Webpack 5 configuration for module processing rules.
 *
 * @details
 * This module defines an array of rules that Webpack uses to process various types of files within the project. Each rule specifies the conditions under
 * which specific loaders should be applied to transform files before they are bundled. The configuration aims to optimize the build process for both
 * development and production environments, providing a clear structure for handling different file types such as CSS, SASS, JavaScript, images, SVGs,
 * fonts, and Markdown.
 *
 * Key functionalities:
 * 1. **babel-loader**: Transforms ES6+ and JSX syntax into backward-compatible JavaScript using Babel, allowing developers to write modern JavaScript while ensuring compatibility with older environments.
 * 2. **css-loader**: Interprets `@import` and `url()` statements in CSS files, resolving them into valid JavaScript modules that can be bundled. It also supports CSS Modules for scoped styling.
 * 3. **style-loader**: Injects CSS into the DOM by adding a `<style>` tag, enabling hot module replacement in development environments.
 * 4. **MiniCssExtractPlugin.loader**: Extracts CSS into separate files instead of injecting them into the DOM, optimizing the loading of CSS in production environments.
 * 5. **postcss-loader**: Processes CSS with PostCSS, enabling features like auto pre fixing and applying various transformations through plugins, ensuring modern CSS practices are followed.
 * 6. **sass-loader**: Compiles SASS/SCSS files into CSS, allowing for the use of nested syntax, variables, and mixins, enhancing CSS organization and reusability.
 * 7. **resolve-url-loader**: Resolves relative paths in SASS/SCSS files, ensuring that URLs in the CSS output are correct after the compilation.
 * 8. **html-loader**: Exports HTML as a string and processes HTML files, enabling the use of inline assets and templates while maintaining correct asset paths.
 * 9. **url-loader**: Transforms files into base64 URLs if they are smaller than the specified limit, reducing the number of HTTP requests for small assets like images and fonts.
 * 10. **file-loader**: Emits files to the output directory and returns their public URLs, allowing for proper asset management in bundled applications.
 * 11. **@svgr/webpack**: Converts SVG files into React components, enabling easy integration of SVGs in React applications with customizable properties.
 * 12. **markdown-loader**: Processes Markdown files and converts them into HTML, allowing Markdown content to be included in web applications easily.
 * 13. **@mdx-js/loader**: Transforms MDX files (Markdown with JSX) into React components, combining the ease of writing Markdown with the flexibility of React.
 * 14. **source-map-loader**: Extracts source maps from existing JavaScript files, enabling better debugging experiences in development environments by mapping minified code back to original sources.
 * 15. Optimize file processing based on the current environment (development or production).
 * 16. Support for CSS modules and dynamic error handling to ensure rules are correctly configured.
 *
 * @constant {Object[]} rules - An array of Webpack rule objects for processing files.
 * @property {RegExp} test - Regular expressions to match specific file extensions (e.g., `.css`, `.scss`, `.svg`).
 * @property {string[]} exclude - Paths or modules to exclude from processing (e.g., `node_modules`).
 * @property {Object[]} use - An array of loader objects used to transform matched files.
 * @property {string} use.loader - The name of the loader to use (e.g., `css-loader`, `sass-loader`).
 * @property {Object} use.options - Options for the loader, controlling processing behavior.
 * @property {boolean} use.options.cacheDirectory - Enables caching for faster rebuilds in `babel-loader`.
 * @property {boolean} use.options.minimize - Minimizes the output in production mode.
 * @property {boolean} use.options.sourceMap - Enables source maps for debugging in development mode.
 * @property {boolean} use.options.modules - Configures CSS Modules support.
 * @property {string} generator.filename - Defines output filename patterns for assets (e.g., images or fonts).
 * @property {string} generator.publicPath - Public path for assets (e.g., `assets/images/`).
 * @property {string} generator.outputPath - Output directory for assets (e.g., `static/images/`).
 * @property {Object} parser - Parser settings for handling asset sizes and conditions.
 * @property {Object} parser.dataUrlCondition - Conditions for inlining files as Data URLs based on size.
 * @property {number} parser.dataUrlCondition.maxSize - Maximum file size (in bytes) for inlining.
 *
 * @example
 * * Example rule for handling `.scss` files
 * {
 *   test: /\.scss$/,
 *   use: getStyleLoaders({
 *     importLoaders: 2,
 *     sourceMap: true,
 *     modules: {
 *       mode: 'local',
 *       getLocalIdent: getCSSModuleLocalIdent,
 *     },
 *   }),
 * }
 *
 * @returns {Object[]} An array of Webpack rules.
 *
 * @author Yagnik Vadi <yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-09-26
 * @updated 2024-09-30
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

import path from 'path';
import getCSSModuleLocalIdent from 'react-dev-utils/getCSSModuleLocalIdent.js';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { fileURLToPath } from 'url';

import paths from '../routes/paths.mjs';
import { inDev } from "../helpers/webpack.helpers.mjs";

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// style files regex's
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        inDev() && {
            loader: 'style-loader',
        },
        !inDev() && {
            loader: MiniCssExtractPlugin.loader,
            options: paths.publicUrlOrPath.startsWith('.')
                ? { publicPath: '../../' }
                : {},
        },
        {
            loader: 'css-loader',
            options: cssOptions,
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    ident: 'postcss',
                    config: false,
                    plugins: [
                        'postcss-flexbugs-fixes',
                        [
                            'postcss-preset-env',
                            {
                                autoprefixer: {
                                    flexbox: 'no-2009',
                                },
                                stage: 3,
                            },
                        ],
                    ]
                },
                sourceMap: !inDev() && shouldUseSourceMap,
            },
        },
    ].filter(Boolean);

    if (preProcessor) {
        loaders.push(
            {
                loader: 'resolve-url-loader',
                options: {
                    sourceMap: !inDev() && shouldUseSourceMap,
                    root: paths.appSrc,
                },
            },
            {
                loader: preProcessor,
                options: {
                    sourceMap: true,
                },
            }
        );
    }

    return loaders;
};

// Declare the rules array before adding rules to it
const rules = [];

// Add source-map-loader to handle source maps
const sourceMapRule = !inDev() && shouldUseSourceMap && {
    enforce: 'pre',
    exclude: /@babel(?:\/|\\{1,2})runtime/,
    test: /\.(js|mjs|jsx|ts|tsx|css)$/,
    loader: 'source-map-loader',
};

if (sourceMapRule) {
    rules.push(sourceMapRule);
}

// HTML Rule
const htmlRule = {
    test: /\.html$/i,
    exclude: /node_modules/,
    use: [
        {
            loader: 'html-loader',
            options: {
                sources: {
                    scriptingEnabled: false,
                },
                minimize: inDev() ? false : true,
                esModule: false,
            },
        },
    ],
};

// CSS Rule
const cssRule = {
    test: cssRegex,
    exclude: cssModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: shouldUseSourceMap,
        modules: {
            mode: 'icss',
        },
    }),
    sideEffects: true,
};

// CSS Module Rule
const cssModuleRule = {
    test: cssModuleRegex,
    use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: shouldUseSourceMap,
        modules: {
            mode: 'local',
            getLocalIdent: getCSSModuleLocalIdent,
        },
    }),
};

// SASS Rule
const sassRule = {
    test: sassRegex,
    exclude: sassModuleRegex,
    use: getStyleLoaders(
        {
            importLoaders: 3,
            sourceMap: shouldUseSourceMap,
            modules: {
                mode: 'icss',
            },
        },
        'sass-loader'
    ),
    sideEffects: true,
};

// JavaScript and TypeScript Rules
const jsTsRule = {
    test: /\.[jt]sx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                cacheCompression: false,
                compact: !inDev(),
            },
        },
        {
            loader: 'ts-loader',
        },
    ],
};

// Module JavaScript Rules
const moduleJsRule = {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                configFile: path.resolve(__dirname, "..", "..", "..", "babel.config.mjs"),
            },
        },
        {
            loader: 'ts-loader',
        },
    ],
};

// Image Rule
const imageRule = {
    test: /\.(png|jpe?g|gif|ico)(\?v=\d+\.\d+\.\d+)?$/i,
    // EX. ==> 1. example.png 2. example.png?v=1.2.3
    exclude: /node_modules/,
    type: 'asset',
    generator: {
        filename: inDev() ? '[name][ext][query]' : '[hash][ext][query]',
        publicPath: 'assets/images/',
        outputPath: 'static/images/',
    },
    parser: {
        dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb limit
        },
    },
};

// SVGs Rule
const svgRule = {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    // EX. ==> 1. example.svg 2. example.svg?v=1.2.3
    issuer: /\.([jt]sx|md|mdx)?$/,
    use: [
        {
            loader: '@svgr/webpack',
            options: {
                icon: true,
                titleProp: true,
                ref: true,
                prettier: false,
                svgo: false,
                svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                },
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
};

// font Rules
const fontRule = {
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
};

// Markdown Documentation Rules
const mdRule = {
    test: /\.md$/,
    use: [
        {
            loader: "markdown-loader",
        },
    ],
};

// Markdown that lets you include JSX in Markdown documents
const mdxRule = {
    test: /\.mdx?$/,
    use: [
        {
            loader: '@mdx-js/loader',
        }
    ]
};

// Add rules to the array
rules.push(htmlRule, cssRule, cssModuleRule, sassRule, jsTsRule, moduleJsRule, imageRule, svgRule, fontRule, mdRule, mdxRule);

// Ensure rules is an array
if (!Array.isArray(rules)) {
    throw new TypeError("Expected 'rules' to be an array.");
}

export default rules;
