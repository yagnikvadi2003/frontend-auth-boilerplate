import { merge } from "webpack-merge";
import commonConfig from "./webpack.common.js";

export default async (envVars) => {
    const { env } = envVars;
    const envConfig = (await import(`./webpack.${env}.js`)).default;
    // const config = merge(commonConfig, envConfig);
    const config = merge(commonConfig, envConfig, {
        devServer: {
            static: [path.join(__dirname, "..", "dist")],
            open: true,
            compress: true,
            historyApiFallback: true,
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.name": JSON.stringify("development"),
            }),
        ],
    });
    return config;
};
