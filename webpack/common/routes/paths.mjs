'use strict';

/**
 * @file paths.mjs
 * @description Utility file for defining key project paths and public URL handling.
 *
 * @details
 * This module centralizes and exports all essential paths used throughout the project 
 * for easier maintenance and configuration. Paths are dynamically resolved based on 
 * the project’s root directory and environment variables. It also handles the setup 
 * for public URL resolution for both development and production environments.
 *
 * Key functionalities:
 * 1. Define and resolve critical project paths, such as the source, build, public, and 
 *    node modules directories.
 * 2. Manage the paths to various configuration files such as `tsconfig.json`, `jsconfig.json`,
 *    and lock files (yarn, pnpm).
 * 3. Dynamically resolve the entry point for JavaScript or TypeScript (`appIndexJs`) based 
 *    on the file extensions configured.
 * 4. Expose `publicUrlOrPath` utility for determining the correct public URL or path in 
 *    development and production modes.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-09-26
 * @updated 2024-09-27
 *
 * @usage
 * - Import this module to retrieve any essential project paths for use in configuration files 
 *   like Webpack, Babel, or TypeScript.
 * - Modify `resolveApp()` calls to adjust the base paths as needed for your project's structure.
 *
 * @note
 * Ensure that the `buildPath` and `publicUrlOrPath` environment variables are correctly set 
 * for production builds to avoid issues with the deployment base path.
 *
 * @see https://nodejs.org/api/path.html
 * @see https://nodejs.org/api/fs.html
 */

import { buildPath, publicUrlOrPath, resolveApp, resolveModule } from '../../utils/utils.mjs';

const paths = {
    dotenv: resolveApp('.env'),
    appPath: resolveApp('.'),
    appBuild: resolveApp(buildPath),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveModule(resolveApp, 'src/index'),
    appPackageJson: resolveApp('package.json'),
    appSrc: resolveApp('src'),
    appTsConfig: resolveApp('tsconfig.json'),
    appJsConfig: resolveApp('jsconfig.json'),
    yarnLockFile: resolveApp('yarn.lock'),
    pnpmYamlFile: resolveApp('pnpm-lock.yaml'),
    appNodeModules: resolveApp('node_modules'),
    appWebpackCache: resolveApp('node_modules/.cache'),
    appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'),
    publicUrlOrPath,
};

export default paths;
