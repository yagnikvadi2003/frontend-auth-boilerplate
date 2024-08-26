'use strict';

import path from 'path';
import { fileURLToPath } from 'url';

// Convert the module URL to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Asynchronously import plugins
const loadPlugins = async () => {
    const pluginsPath = path.resolve(__dirname, "..", "plugins/webpack.plugins.mjs");
    try {
        const module = await import(pluginsPath);
        return module.default || [];
    } catch (err) {
        console.error("Error loading plugins:", err);
        return [];
    }
};

// Asynchronously import rules
const loadRules = async () => {
    const rulesPath = path.resolve(__dirname, "..", "common/rules/webpack.rules.mjs");
    try {
        const module = await import(rulesPath);
        return module.default || [];
    } catch (err) {
        console.error("Error loading rules:", err);
        return [];
    }
};
export default async () => {
    const plugins = await loadPlugins();
    const rules = await loadRules();

    return {
        mode: "production",
        entry: path.resolve(__dirname, "..", "..", "src/index.tsx"),
        module: {
            rules,
        },
        output: {
            filename: "[name].[fullhash].js",
            chunkFilename: "[name].[chunkhash].js",
            clean: true,
        },
        plugins,
        resolve: {
            extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
            // alias: path.resolve(__dirname, "..", "common/routes/webpack.aliases.js"),
        },
        stats: "errors-warnings",
        optimization: {
            minimize: true,
            sideEffects: true,
            concatenateModules: true,
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all",
                maxInitialRequests: 10,
                minSize: 0,
                cacheGroups: {
                    vendor: {
                        name: "vendors",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                    },
                },
            },
        },
    };
};
