'use strict';

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
