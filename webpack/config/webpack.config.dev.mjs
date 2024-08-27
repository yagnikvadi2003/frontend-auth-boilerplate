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
        mode: "development",
        entry: path.resolve(__dirname, "..", "..", "src/index.tsx"),
        module: {
            rules,
        },
        output: {
            asyncChunks: true,
            filename: "[name].js",
            chunkFilename: "[name].chunk.js",
            path: path.resolve(__dirname, "..", "..", "dist"),
            clean: true,
        },
        plugins,
        resolve: {
            extensions: [".js", ".ts", ".tsx", ".css"],
            // alias: path.resolve(__dirname, "..", "common/routes/webpack.aliases.js"),
        },
        stats: "errors-warnings",
        devServer: {
            hot: true,
            port: 5114,
            compress: true,
            webSocketServer: 'ws',
            historyApiFallback: true,
            open: {
                target: ['http://localhost:5114'],
                app: {
                    name: 'google-chrome',
                    // arguments: ['--incognito', '--new-window'],
                },
            },
            client: {
                progress: true,
                reconnect: 5,
                logging: 'info',
                webSocketTransport: 'ws',
                webSocketURL: 'ws://127.0.0.1:5114/ws',
                overlay: {
                    errors: true,
                    warnings: true,
                    runtimeErrors: true,
                },
            },
            static: {
                directory: path.join(__dirname, "..", "..", "dist"),
                watch: true,
            },
            devMiddleware: {
                index: true,
                mimeTypes: { phtml: 'text/html' },
                publicPath: path.resolve(__dirname, "..", "..", "src/assets/**/*"),
                serverSideRender: true,
                writeToDisk: true,
            },
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/,
        },
        optimization: {
            splitChunks: {
                chunks: "all",
            },
        },
        // performance: {
        //     hints: 'error',               // 'warning' or false can also be used
        //     maxAssetSize: 500000,         // 500 KB max per asset
        //     maxEntrypointSize: 500000,    // 500 KB max per entry point
        // },
    };
};
