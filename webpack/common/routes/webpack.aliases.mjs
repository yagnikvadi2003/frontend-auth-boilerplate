'use strict';

/**
 * @file webpack.aliases.mjs
 * @description Webpack 5 alias configuration for simplified module resolution.
 *
 * @details
 * This module defines alias mappings for various directories within the project. Aliases help 
 * simplify import statements, replacing lengthy relative paths with shorter, more readable ones.
 * Each alias is mapped to its absolute path using the context of the current module's directory.
 * The `createWebpackAliases` utility allows for additional flexibility and dynamic alias generation.
 *
 * **Key functionalities:**
 * 1. Resolves the absolute path for the current module using `import.meta.url`.
 * 2. Generates an alias map for Webpack to simplify imports for directories like `@components`, 
 *    `@assets`, and utilities.
 * 3. Dynamically merges additional aliases from the `modules.webpackAliases` object, allowing 
 *    modular extension of the alias configuration.
 *
 * @constant {string} __filename - Absolute file path of the current module, resolved using `fileURLToPath`.
 * @constant {string} __dirname - Directory name of the current module, derived from `__filename`.
 * @constant {Object} webpackAliases - Object containing the alias mappings for Webpack.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.1.0
 * @created 2024-08-27
 * @updated 2024-10-03
 *
 * @usage
 * - Import this module in your Webpack configuration to leverage the predefined aliases.
 * - Use these aliases in your application code for cleaner, more manageable import statements.
 *
 * @example
 * * Example of using an alias in an import statement:
 * import MyComponent from '@components/MyComponent';
 *
 * @note
 * Ensure that the paths defined in the alias mappings correctly reflect the directory structure
 * of your project. Misconfigured paths could result in import errors during Webpack builds.
 *
 * **Dynamic Aliases**:
 * The alias configuration can be extended by the `modules.webpackAliases` object. Ensure that the
 * `modules.mjs` file properly exports a valid object, which may include additional alias mappings.
 * This is especially useful for modular projects with variable directory structures.
 *
 * @see {@link createWebpackAliases} for the underlying alias creation logic.
 * @see https://webpack.js.org/configuration/resolve/#resolvealias for more details on Webpack aliases.
 */


import path from 'path';
import { fileURLToPath } from 'url';
import { createWebpackAliases } from '../helpers/webpack.helpers.mjs';
import modules from '../modules/modules.mjs';

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
 * Generates alias mappings for Webpack module resolution.
 * 
 * This alias object simplifies imports by mapping short alias names (e.g., `@components`) to 
 * specific directories in the project. Additional aliases can be injected dynamically from 
 * the `modules.webpackAliases` object.
 *
 * **Alias Mapping Details**:
 * - Each alias key (e.g., `@src`) is mapped to its corresponding directory in the project.
 * - Aliases are created by resolving the absolute path based on the current file's directory (`__dirname`).
 * - If the project structure changes, ensure these paths are updated accordingly.
 * 
 * @constant {Object} webpackAliases - The generated alias map for Webpack.
 *
 * @example
 * * Example alias configuration:
 * {
 *   "@src": "/absolute/path/to/src",
 *   "@assets": "/absolute/path/to/src/assets",
 *   ...
 * }
 * 
 * @see {@link createWebpackAliases} for the alias creation logic and dynamic extensions.
 * @see https://webpack.js.org/configuration/resolve/#resolvealias for official Webpack documentation.
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
    ...(modules.webpackAliases || {}),
    // Add other aliases as necessary
});

export default webpackAliases;
