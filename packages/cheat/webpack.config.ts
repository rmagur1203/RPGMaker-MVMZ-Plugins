import path from "path";
import webpack from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const isDev = process.env.NODE_ENV !== "production";

const config: webpack.Configuration = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  devtool: isDev ? "eval-source-map" : false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cheat.js",
    library: "cheat",
    libraryTarget: "umd",
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
    fallback: {
      path: require.resolve("path-browserify"),
    },
  },
};

export default config;
