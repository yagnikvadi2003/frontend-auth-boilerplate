import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

/**
 * Merges the common Webpack configuration with the environment-specific configuration.
 * 
 * @async
 * @function
 * 
 * @param {Object} env - The environment object passed to the Webpack configuration.
 * @param {boolean} env.production - A flag indicating whether the production environment is active.
 * 
 * @returns {Promise<Object>} A promise that resolves to the merged Webpack configuration.
 */
export default async (env) => {
    /**
     * @constant {Object} envConfig
     * The environment-specific Webpack configuration.
     * Dynamically imports the production or development configuration based on the `env.production` flag.
     */
    const envConfig = env.production
        ? (await import('./webpack.prod.js')).default
        : (await import('./webpack.dev.js')).default;

    /**
     * @returns {Object} The final merged Webpack configuration, combining common and environment-specific settings.
     */
    return merge(commonConfig, envConfig);
};
