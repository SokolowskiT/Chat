const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const plugins = [
	new HtmlWebpackPlugin({
		template: "src/index.html",
		filename: "index.html",
		inject: "body"
	})
];

module.exports = env => {
	const environment = env || "production";
	if (environment === "production") {
		plugins.push(
			new OptimizeJsPlugin({
				sourceMap: false
			})
		);
	}

	return {
		entry: (environment !== "production"
			? [
					"react-hot-loader/patch",
					"webpack-dev-server/client?http://localhost:8080",
					"webpack/hot/only-dev-server"
			  ]
			: []
		).concat(["./client/index.js"]),
		output: {
			filename: "./bundle.js",
			path: path.resolve(__dirname, "public")
		},

		module: {
			rules: [
				{
					test: /\.js$/,
					loader: "babel-loader",
					options: {
						presets: ["env", "react"]
					}
				},
				{
					test: /\.css$/,
					use: [
						{ loader: "style-loader" },
						{
							loader: "css-loader",
							options: {
								modules: true
							}
						}
					]
				}
			]
		},
		plugins: plugins
	};
};
