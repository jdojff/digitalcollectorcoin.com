const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
		chunkFilename: '[chunkhash].js',
		library: 'EntryPoint',
		libraryTarget: 'var',
		libraryExport: 'default',
		sourceMapFilename: 'bundle.js.map'
	},
	module: {
		rules: [{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				include: /src/
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader?presets[]=react,presets[]=es2015,presets[]',
				exclude: /node_modules/,
				query: {
					presets: ['env', 'react', 'stage-2']
				}
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
};
