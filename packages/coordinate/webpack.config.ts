import path from "path";
import webpack from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const isDev = process.env.NODE_ENV === "development";

const config: webpack.Configuration = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  devtool: isDev ? "inline-source-map" : false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "save.js",
    library: "save",
    libraryTarget: "umd",
    sourceMapFilename: "save.js.map",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /(node_modules)/,
        use: {
          // `.swcrc` can be used to configure swc
          loader: "swc-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
  },
};

export default config;
