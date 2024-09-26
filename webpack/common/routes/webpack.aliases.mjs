'use strict';

/**
 * @file webpack.aliases.mjs
 * @description Webpack 5 alias configuration for module resolution
 *
 * @details
 * This module establishes alias mappings for various directories within the project,
 * facilitating simpler and more intuitive import statements in the application code.
 * By creating these aliases, developers can avoid lengthy relative paths and enhance
 * code maintainability. Each alias is mapped to its absolute path using the current
 * module's directory context.
 *
 * Key functionalities:
 * 1. Resolve the absolute path for the current module using `import.meta.url`.
 * 2. Generate an alias map for Webpack that simplifies imports for directories such as 
 *    components, assets, and utilities.
 *
 * @constant {string} __filename - Absolute file path of the current module.
 * @constant {string} __dirname - Directory name of the current module.
 * @constant {Object} webpackAliases - The generated alias object for Webpack.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-27
 * @updated 2024-09-26
 *
 * @usage
 * - Import this module in your Webpack configuration to utilize the defined aliases.
 * - Use the aliases in your application code for cleaner and more manageable imports.
 *
 * @example
 * * Example of using an alias in an import statement
 * import MyComponent from '@components/MyComponent';
 *
 * @note
 * Ensure that the paths defined in the alias mappings accurately reflect the project's
 * directory structure to avoid import errors.
 *
 * @see {@link createWebpackAliases} for details on the alias creation logic.
 * @see https://webpack.js.org/configuration/resolve/#resolvealias for more on Webpack aliases.
 */


import path from 'path';
import { fileURLToPath } from 'url';
import { createWebpackAliases } from '../helpers/webpack.helpers.mjs';

/**
 * Resolves module file path for the current file using URL.
 * Converts `import.meta.url` to a file path and determines the current directory.
 *
 * @constant {string} __filename - Absolute file path of the current module.
 * @constant {string} __dirname - Directory name of the current module.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Creates an alias map for Webpack module resolution.
 * 
 * This function generates an alias mapping for Webpack to simplify imports
 * for specific directories (e.g., `@components`, `@assets`). Each alias
 * is mapped to its absolute path in the project structure.
 *
 * @constant {Object} webpackAliases - The generated alias object for Webpack.
 *
 * @example
 * !Example alias configuration
 * {
 *   "@src": "/absolute/path/to/src",
 *   "@assets": "/absolute/path/to/src/assets",
 *   ...
 * }
 * 
 * @see {@link createWebpackAliases} for alias creation logic.
 */
const webpackAliases = createWebpackAliases({
    "@src": path.resolve(__dirname, "..", "..", "..", "src"),
    "@assets": path.resolve(__dirname, "..", "..", "..", "src/assets"),
    "@types": path.resolve(__dirname, "..", "..", "..", "src/types"),
    "@components": path.resolve(__dirname, "..", "..", "..", "src/components"),
    "@hooks": path.resolve(__dirname, "..", "..", "..", "src/hooks"),
    "@interface": path.resolve(__dirname, "..", "..", "..", "src/interface"),
    "@layout": path.resolve(__dirname, "..", "..", "..", "src/layout"),
    "@pages": path.resolve(__dirname, "..", "..", "..", "src/pages"),
    "@global": path.resolve(__dirname, "..", "..", "..", "src/global"),
    "@routes": path.resolve(__dirname, "..", "..", "..", "src/routes"),
    "@sections": path.resolve(__dirname, "..", "..", "..", "src/sections"),
    "@services": path.resolve(__dirname, "..", "..", "..", "src/services"),
    "@store": path.resolve(__dirname, "..", "..", "..", "src/store"),
    "@styles": path.resolve(__dirname, "..", "..", "..", "src/styles"),
    "@utils": path.resolve(__dirname, "..", "..", "..", "src/utils"),
    // Add other aliases as necessary
});

export default webpackAliases;
