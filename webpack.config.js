const path = require('path');

module.exports = {
	entry: {
		build: path.join(__dirname, 'src/js', 'main.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/dist/',
		chunkFilename: '[name].[chunkhash].js',
		library: 'EntryPoint',
		libraryTarget: 'var',
		libraryExport: 'default',
		sourceMapFilename: 'bundle.js.map'
	},
	devtool: 'eval-cheap-module-source-map',
	module: {
		loaders: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				include: /src/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react', 'stage-2']
				}
			},
			{
				test: /\.json$/, // To load the json files
				loader: 'json-loader'
			},
			{
				test: /\.(scss)$/,
				use: [{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('autoprefixer')
								];
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader'
			}
		]
	}
}
