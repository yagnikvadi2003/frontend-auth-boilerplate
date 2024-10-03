'use strict';

/**
 * @file webpack.resolve.mjs
 * @description Webpack configuration for module resolution and aliasing in a React application.
 *
 * @details
 * This module defines the configuration for resolving modules in a Webpack setup, particularly 
 * for React applications. It checks for the presence of TypeScript configurations and sets 
 * appropriate paths for module resolution. The configuration includes defining fallbacks for 
 * certain Node.js modules that may not be available in the browser environment and enforces 
 * module boundaries to prevent accidental imports from outside the designated source directory.
 *
 * Key functionalities:
 * 1. **Module Resolution**: Configures paths for Webpack to resolve modules, giving priority 
 * to `node_modules` and allowing additional module paths as specified in the project.
 * 
 * 2. **File Extensions**: Supports various file extensions, including JavaScript and TypeScript, 
 * ensuring compatibility with both ecosystems and optimizing the build process.
 * 
 * 3. **Webpack Aliases**: Maps certain import paths to specific directories, simplifying 
 * module imports and improving code readability.
 * 
 * 4. **ModuleScopePlugin**: Restricts module imports to the `src` directory and `node_modules`, 
 * preventing accidental imports from outside the designated source files.
 * 
 * 5. **Fallback Configuration**: Provides fallbacks for specific Node.js modules that are 
 * commonly used in web applications (e.g., `buffer`, `crypto`, `stream`) to ensure proper 
 * functionality in a browser environment.
 *
 * @constant {Object} resolveConfig - The Webpack configuration object for resolving modules.
 * @property {string[]} modules - Array of directories where Webpack should look for modules.
 * @property {string[]} extensions - Array of file extensions that should be resolved by Webpack.
 * @property {Object} alias - Object mapping of Webpack aliases for cleaner imports.
 * @property {Array} plugins - Array of plugins to enhance module resolution.
 * @property {Object} fallback - Object providing fallbacks for Node.js modules in a browser context.
 *
 * @returns {Object} The Webpack configuration object for module resolution.
 *
 * @throws {Error} Throws an error if TypeScript configuration is expected but not found.
 *
 * @example
 * * Example of how to use resolveConfig in a Webpack configuration
 * import resolveConfig from './webpack.resolve.mjs';
 *
 * export default {
 *   resolve: resolveConfig,
 *   // other webpack configurations...
 * };
 *
 * @author Yagnik Vadi <yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-10-03
 * @updated 2024-10-03
 *
 * @usage
 * - Import this module into your main Webpack configuration file to configure module resolution.
 * - Adjust the module paths, extensions, and fallback settings as needed for your project.
 *
 * @note
 * Ensure that all required packages are installed and properly configured to avoid runtime issues.
 *
 * @see https://webpack.js.org/configuration/resolve/ for more information on module resolution settings.
 */

import fs from 'fs';
import { resolve } from 'path';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin.js';

import modules from "../modules/modules.mjs";
import paths from "../routes/paths.mjs";
import webpackAliases from "../routes/webpack.aliases.mjs";

import { moduleFileExtensions } from "../../utils/utils.mjs";

// Check if TypeScript is setup
const useTypeScript = fs.existsSync(paths.appTsConfig);

const resolveConfig = {
    // This allows you to set a fallback for where webpack should look for modules.
    // We placed these paths second because we want `node_modules` to "win"
    // if there are any conflicts. This matches Node resolution mechanism.
    // https://github.com/facebook/create-react-app/issues/253
    modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
    ),
    // These are the reasonable defaults supported by the Node ecosystem.
    // We also include JSX as a common component filename extension to support
    // some tools, although we do not recommend using it, see:
    // https://github.com/facebook/create-react-app/issues/290
    // `web` extension prefixes have been added for better support
    // for React Native Web.
    extensions: moduleFileExtensions
        .map((ext) => `.${ext}`)
        .filter((ext) => useTypeScript || !ext.includes("ts")),
    alias: webpackAliases,
    plugins: [
        // Prevents users from importing files from outside of src/ (or node_modules/).
        // This often causes confusion because we only process files within src/ with babel.
        // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
        // please link the files into your node_modules/ and let module-resolution kick in.
        // Make sure your source files are compiled, as they will not be processed in any way.
        new ModuleScopePlugin(paths.appSrc, [
            paths.appPackageJson
        ]),
    ],
    // Redirect module requests when normal resolving fails.
    fallback: {
        // Binary Data Handling, Buffer data efficient manage in memory
        buffer: resolve("buffer"),
        // `browsers do not natively support Node.js's crypto module` If you're bundling JavaScript 
        // for a browser environment (frontend) and use a package that depends on crypto, Webpack won't 
        // know how to handle it because the crypto module doesn't exist in browsers.
        // Data Security, Hashing, and Encryption/Decryption
        crypto: resolve("crypto-browserify"),
        // Handling Large Files, Real-time Data Processing, and Network Operations
        stream: resolve("stream-browserify"),
    },
}

export default resolveConfig;