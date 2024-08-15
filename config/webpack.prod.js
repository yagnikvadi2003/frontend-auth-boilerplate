import webpack from "webpack";
import TerserPlugin from "terser-webpack-plugin";

export default {
    mode: "production",
    devtool: false,
    plugins: [
        new webpack.DefinePlugin({
            "process.env.name": JSON.stringify("production"),
        }),
    ],
    optimization: {
        minimize: true,
    },
};
