/**
 * @file babel.config.mjs
 * @description Babel configuration for transforming modern JavaScript and React code using ES module syntax.
 *
 * @details
 * This configuration file specifies the presets used by Babel to transpile modern JavaScript, 
 * React, and TypeScript code into versions that are compatible with older browsers and environments. 
 * It leverages Babel's powerful transformation capabilities to enable the use of the latest 
 * JavaScript features while maintaining backward compatibility.
 *
 * Key functionalities:
 * 1. **@babel/core**: Contains core functionalities for parsing, transforming, and generating code.
 * 2. **@babel/cli**: Command-line interface for executing Babel commands to compile JavaScript files or projects.
 * 3. **@babel/preset-env**: Automatically transforms ECMAScript 2015+ (ES6+) syntax based on specified target environments.
 * 4. **@babel/preset-react**: Converts JSX syntax used in React components into plain JavaScript, enabling dynamic UI rendering.
 * 5. **@babel/preset-typescript**: Transforms TypeScript code into JavaScript, allowing for type-safe development while stripping TypeScript-specific syntax.
 * 6. Common plugins (e.g., for dynamic imports) can be added for further customization.
 *
 * @author Yagnik Vadi<yagnik.infineit2003@gmail.com>
 * @version 1.0.0
 * @created 2024-08-15
 * @updated 2024-09-26
 *
 * @usage
 * - Modify the presets as necessary to include additional plugins or specific configurations for your project needs.
 * - Ensure all required Babel packages are installed in the project to avoid runtime errors during the build process.
 *
 * @note
 * Keep the configuration up-to-date with the latest Babel versions to take advantage of new features and performance improvements.
 *
 * @see https://babeljs.io/docs/en/configuration for more information on Babel configuration options and presets.
 */

export default function (api) {
    // Enable Babel caching for better performance
    api.cache(true);

    // Define the Babel presets
    const presets = [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ];

    // Define the Babel plugins (customize as per your project requirements)
    const plugins = [
        // Example plugins: add more as needed for the project
        "@babel/plugin-syntax-dynamic-import"
    ];

    // Return the Babel configuration
    return {
        presets,
        plugins
    };
}

