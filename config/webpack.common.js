import path from "path";
import Dotenv from "dotenv-webpack";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";

const environment = process.env.NODE_ENV || 'development';

export default {
    entry: path.resolve(__dirname, "..", "./src/index.tsx"),
    output: {
        path: path.resolve(__dirname, "..", "dist"),
        pathinfo: environment,
        filename: "[name].[fullhash].js",
		chunkFilename: "[name].[chunkhash].js",
        clean: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new Dotenv({
            path: `./.env.${environment}`, // Load the appropriate .env file based on NODE_ENV
            safe: true, // Load .env.example to check if all required variables are present
            systemvars: true, // Load system environment variables if needed
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(environment),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "..", "./src/index.html"),
        }),
    ],
    devServer: {
        devServer: {
            static: "./dist",
            hot: true,
            open: true,
        },
    },
    mode: environment,
};
