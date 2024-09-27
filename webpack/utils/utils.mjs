'use strict';

/**
 * @file utils.mjs
 * @description Utility module for resolving project paths and handling public URLs.
 *
 * @details
 * This module provides essential utilities for resolving paths within the project 
 * directory, reading configuration from `package.json`, and determining public URLs 
 * or paths for both development and production environments.
 *
 * Key functionalities:
 * 1. Resolve paths relative to the project root directory, ensuring that any symlinks are resolved.
 * 2. Parse and validate public URLs or paths for use in various environments, with support for 
 *    custom `PUBLIC_URL` or `homepage` fields.
 * 3. Provide fallback mechanisms for invalid URLs, defaulting to the root (`/`) path.
 * 4. Dynamically resolve module file extensions based on supported formats (e.g., `.js`, `.mjs`, `.tsx`, etc.).
 * 5. Export utilities to assist with resolving modules and paths during the build process.
 *
 * @author Yagnik Vadi<yagnikvadi8@gmail.com>
 * @version 1.0.0
 * @created 2024-09-26
 * @updated 2024-09-27
 *
 * @usage
 * - Use the `resolveApp()` function to resolve paths relative to the root directory.
 * - Use `getPublicUrlOrPath()` to determine the correct public URL for development or production environments.
 * - Modify the `moduleFileExtensions` array if additional file formats need to be supported.
 *
 * @note
 * Ensure that the `PUBLIC_URL` environment variable or `homepage` field in `package.json` is correctly set 
 * for production builds to define the base path for serving the app.
 *
 * @see https://nodejs.org/api/path.html
 * @see https://nodejs.org/api/fs.html
 */


import path from 'path';
import fs from 'fs'
import { URL } from 'url';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
export const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Manually read package.json using fs
const packageJsonPath = resolveApp('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

/**
 * Returns a URL or a path with slash at the end
 * In production can be URL, absolute path, or relative path
 * In development always will be an absolute path
 * In development can use `path` module functions for operations
 *
 * @param {boolean} isEnvDevelopment
 * @param {(string|undefined)} homepage a valid URL or pathname
 * @param {(string|undefined)} envPublicUrl a valid URL or pathname
 * @returns {string} A properly formatted public URL or path.
 */
function getPublicUrlOrPath(isEnvDevelopment, homepage, envPublicUrl) {
    // Fallback domain used for relative URLs
    const stubDomain = isEnvDevelopment ? 'http://localhost:5114' : 'http://localhost:8080';

    if (envPublicUrl) {
        // Ensure `envPublicUrl` has a trailing slash
        envPublicUrl = envPublicUrl.endsWith('/') ? envPublicUrl : envPublicUrl + '/';

        try {
            // Parse the URL to validate if it's a proper URL or just a path
            const validPublicUrl = new URL(envPublicUrl, stubDomain);

            // Return appropriate URL or path depending on the environment
            return isEnvDevelopment
                ? envPublicUrl.startsWith('.')
                    ? '/'
                    : validPublicUrl.pathname // Use the pathname in development mode if it's a full URL
                : envPublicUrl; // In production, return the full `envPublicUrl`
        } catch (e) {
            // If URL construction fails, treat it as a path and return as is
            console.error('Invalid PUBLIC_URL:', e.message);
        }
    }

    if (homepage) {
        // Ensure `homepage` has a trailing slash
        homepage = homepage.endsWith('/') ? homepage : homepage + '/';

        try {
            // Parse the URL to validate if it's a full URL or just a path
            const validHomepagePathname = new URL(homepage, stubDomain).pathname;

            return isEnvDevelopment
                ? homepage.startsWith('.')
                    ? '/'
                    : validHomepagePathname // Return the pathname part if it's a full URL
                : homepage.startsWith('.')
                    ? homepage // Return relative homepage in production if it starts with `.`
                    : validHomepagePathname; // Otherwise, return the valid URL path
        } catch (e) {
            // If URL parsing fails, log the error
            console.error('Invalid homepage URL:', e.message);
        }
    }

    // Default to root `/` path
    return '/';
}



// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
export const publicUrlOrPath = getPublicUrlOrPath(
    process.env.NODE_ENV === 'development',
    packageJson.homepage,
    process.env.PUBLIC_URL
);

export const buildPath = process.env.BUILD_PATH || 'dist';

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
];

// Resolve file paths in the same order as webpack
export const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};
