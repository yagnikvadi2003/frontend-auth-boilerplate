'use strict';

/**
 * @file webpack.modules.mjs
 * @description Dynamic loading and configuration for TypeScript and JavaScript module paths in Webpack.
 *
 * @details
 * This module provides utilities to manage TypeScript and JavaScript configurations for 
 * resolving additional module paths and creating Webpack aliases. It checks for the presence 
 * of `tsconfig.json` or `jsconfig.json` files and handles their respective options to ensure 
 * a smooth development experience. The functionalities include dynamic loading of TypeScript, 
 * resolving additional module paths, and creating Webpack aliases based on the configuration 
 * provided.
 *
 * Key functionalities:
 * 1. **loadTypeScript**: Dynamically imports the TypeScript module if a `tsconfig.json` is present, 
 * allowing TypeScript functionalities to be utilized without hard dependencies.
 * 
 * 2. **getAdditionalModulePaths**: Determines additional module paths based on the `baseUrl` 
 * specified in the TypeScript compiler options. Supports paths that resolve to `src` or 
 * `node_modules`.
 * 
 * 3. **getWebpackAliases**: Generates Webpack aliases based on the `baseUrl` of the TypeScript 
 * compiler options, facilitating cleaner imports in the codebase.
 * 
 * 4. **modules**: Main function that checks for the presence of TypeScript or JavaScript 
 * configuration files, loads the appropriate configurations, and returns resolved module paths 
 * and Webpack aliases.
 *
 * @constant {Object} options - Compiler options retrieved from the configuration files.
 * @property {string} baseUrl - The base URL for module resolution specified in the compiler options.
 * 
 * @returns {Promise<Object>} An object containing resolved additional module paths, Webpack aliases, 
 * and a flag indicating if a TypeScript configuration is present.
 * @property {string[] | null} additionalModulePaths - Paths for additional module resolution.
 * @property {Object} webpackAliases - Object containing Webpack alias mappings.
 * @property {boolean} hasTsConfig - Flag indicating the presence of a TypeScript configuration.
 *
 * @throws {Error} Throws an error if both `tsconfig.json` and `jsconfig.json` are present, 
 * or if the `baseUrl` is invalid.
 *
 * @example
 * * Example usage of modules function to get additional paths and aliases
 * const { additionalModulePaths, webpackAliases, hasTsConfig } = await modules();
 *
 * @author Yagnik Vadi <yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-10-03
 * @updated 2024-10-03
 *
 * @usage
 * - Import this module in your Webpack configuration to utilize dynamic loading and 
 * alias resolution based on TypeScript or JavaScript settings.
 * - Modify or extend the logic to accommodate additional configurations as needed.
 *
 * @note
 * Ensure that the required configuration files (`tsconfig.json` or `jsconfig.json`) are correctly 
 * set up to avoid runtime errors and enable smooth module resolution.
 *
 * @see https://www.typescriptlang.org/docs/handbook/tsconfig-json.html for more information 
 * on TypeScript configuration options.
 */

import fs from 'fs';
import path from 'path';
import chalk from 'react-dev-utils/chalk.js';

import paths from '../routes/paths.mjs';

/**
 * Dynamically load TypeScript if the project has a tsconfig.json.
 * 
 * @returns {Object} TypeScript module.
 */
async function loadTypeScript() {
    try {
        // Dynamically import TypeScript without using resolve.sync
        const ts = await import('typescript');
        return ts.default || ts;  // Handle default export behavior
    } catch (error) {
        throw new Error('TypeScript could not be loaded.');
    }
}

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths(options = {}) {
    const baseUrl = options.baseUrl;

    if (!baseUrl) {
        return '';
    }

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

    if (path.relative(paths.appNodeModules, baseUrlResolved) === '') {
        return null;
    }

    if (path.relative(paths.appSrc, baseUrlResolved) === '') {
        return [paths.appSrc];
    }

    if (path.relative(paths.appPath, baseUrlResolved) === '') {
        return null;
    }

    throw new Error(
        chalk.red.bold(
            "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
            ' Create React App does not support other values at this time.'
        )
    );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases(options = {}) {
    const baseUrl = options.baseUrl;

    if (!baseUrl) {
        return {};
    }

    const baseUrlResolved = path.resolve(paths.appPath, baseUrl);

    if (path.relative(paths.appPath, baseUrlResolved) === '') {
        return {
            src: paths.appSrc,
        };
    }
}

async function modules() {
    const hasTsConfig = fs.existsSync(paths.appTsConfig);
    const hasJsConfig = fs.existsSync(paths.appJsConfig);

    if (hasTsConfig && hasJsConfig) {
        throw new Error(
            'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.'
        );
    }

    let config;

    if (hasTsConfig) {
        // Load TypeScript dynamically for projects with tsconfig.json
        const ts = await loadTypeScript();
        config = ts.readConfigFile(paths.appTsConfig, ts.sys.readFile).config;
    } else if (hasJsConfig) {
        // Dynamically import the jsconfig.json file if present
        config = (await import(paths.appJsConfig)).default;
    }

    config = config || {};
    const options = config.compilerOptions || {};

    const additionalModulePaths = getAdditionalModulePaths(options);

    return {
        additionalModulePaths: additionalModulePaths,
        webpackAliases: getWebpackAliases(options),
        hasTsConfig,
    };
}

// Export functions in ES Modules syntax
export default modules;
