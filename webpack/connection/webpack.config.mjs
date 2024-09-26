'use strict';

/**
 * @file webpack.config.mjs
 * @description Webpack configuration loader for environment-specific settings
 *
 * @details
 * This module dynamically loads the appropriate Webpack configuration 
 * based on the current environment (development or production). It 
 * determines the environment using the `NODE_ENV` variable and imports 
 * the corresponding configuration file to ensure that the correct 
 * settings and optimizations are applied.
 *
 * Key functionalities:
 * 1. Determine the current environment (development or production).
 * 2. Load the relevant Webpack configuration file based on the environment.
 * 3. Handle errors gracefully during the loading process, providing 
 *    feedback on configuration loading issues.
 *
 * @constant {string} __filename - Absolute file path of the current module.
 * @constant {string} __dirname - Directory name of the current module.
 * @constant {string} env - Current environment, defaults to 'development' if not set.
 * @constant {string} envConfigPath - Path to the environment-specific configuration file.
 *
 * @returns {Promise<Object>} A promise resolving to the loaded Webpack configuration object.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-27
 * @updated 2024-09-26
 *
 * @usage
 * - Ensure that the `NODE_ENV` variable is set to the desired environment before running the build.
 * - The configuration loader can be imported and used in the main Webpack configuration file.
 *
 * @note
 * If the specified configuration file cannot be loaded, an error will be logged to the console.
 * Ensure that the configuration files for both development and production environments are properly set up.
 *
 * @see https://webpack.js.org/configuration/ for more information on Webpack configuration options.
 */

import path from 'path';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default to development if NODE_ENV is not set
const env = process.env.NODE_ENV || 'development';

// Load environment-specific configuration
const envConfigPath = env === 'production'
    ? path.resolve(__dirname, '..', 'config/webpack.config.prod.mjs')
    : path.resolve(__dirname, '..', 'config/webpack.config.dev.mjs');

const loadConfig = async () => {
    try {
        const configModule = await import(envConfigPath);
        return configModule.default || {};
    } catch (error) {
        console.error('Error loading configuration:', error);
        throw error;
    }
};

export default loadConfig();
