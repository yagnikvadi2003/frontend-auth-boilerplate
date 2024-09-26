'use strict';

/**
 * @file webpack.helpers.mjs
 * @description Helper functions for Webpack 5 configuration
 *
 * @details
 * This module contains utility functions that assist in configuring
 * and optimizing the Webpack setup for the project. It includes
 * methods to check the current environment mode and to create
 * alias mappings for module resolution.
 *
 * Key functionalities:
 * 1. `inDev`: Checks if the application is running in development mode
 *    by evaluating the `NODE_ENV` environment variable.
 * 2. `createWebpackAliases`: Generates an alias object for Webpack 
 *    from a given set of aliases, ensuring only valid aliases are included.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-27
 * @updated 2024-09-26
 *
 * @usage
 * - Use `inDev()` to conditionally execute code that should only run in 
 *   development environments.
 * - Call `createWebpackAliases(aliases)` with an object of aliases to 
 *   generate a valid alias mapping for Webpack.
 *
 * @note
 * Ensure the `NODE_ENV` variable is correctly set in your environment to
 * reflect the intended mode (development or production).
 *
 * @see https://webpack.js.org/configuration/
 */


/**
 * Checks if the application is running in development mode.
 * 
 * This function determines whether the current environment is set to
 * "development" based on the `NODE_ENV` environment variable.
 *
 * @return {boolean} Returns `true` if the environment is development, otherwise `false`.
 *
 * @example
 * * Check if running in development mode
 * if (inDev()) {
 *   console.log("App is in development mode");
 * }
 */
export const inDev = () => {
    return process.env.NODE_ENV === "development";
};

/**
 * Creates an alias object for Webpack from a given set of aliases.
 * 
 * This function takes an object containing alias mappings and returns
 * a new object that maps the alias names to their respective paths.
 * Only valid aliases (i.e., those that are own properties) will be included.
 *
 * @param  {Object} aliases - An object where each key is an alias name and the value is the corresponding path.
 * @return {Object} A new object where each alias name is mapped to its respective path.
 *
 * @example
 * * Example input
 * const aliases = {
 *   "@components": "/src/components",
 *   "@assets": "/src/assets"
 * };
 *
 * ? Call the function
 * const webpackAliases = createWebpackAliases(aliases);
 * 
 * @example
 * * Output
 * {
 *   "@components": "/src/components",
 *   "@assets": "/src/assets"
 * }
 */
export const createWebpackAliases = (aliases) => {
    const result = {};
    for (const name in aliases) {
        if (Object.prototype.hasOwnProperty.call(aliases, name)) {
            result[name] = aliases[name];
        }
    }
    return result;
};
