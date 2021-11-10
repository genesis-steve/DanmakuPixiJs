import * as Path from 'path';
import * as HtmlPlugin from 'html-webpack-plugin';

const appDir = Path.dirname( __dirname );

module.exports = {
	context: Path.join( __dirname, '../game/src' ),
	entry: [ './main.ts' ],
	mode: 'none',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				use: [ 'style-loader', 'css-loader' ],
			},
			{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'null-loader'
			},
			{
				test: /\.json$/,
				loader: 'json5-loader',
				options: {
					esModule: false,
				},
				type: 'javascript/auto'
			},
			{
				test: /assets(\/|\\)/,
				use: 'file-loader?name=assets/[hash].[ext]'
			}
		]
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.css', '.scss' ],
		modules: [
			Path.resolve( appDir, 'game' ),
			Path.resolve( appDir, 'core' ),
			Path.resolve( appDir, 'node_modules' )
		],
		alias: {
			'game': Path.resolve( appDir, 'game/' ),
			'core': Path.resolve( appDir, 'core/' ),
			'assets': Path.resolve( appDir, 'assets/' )
		}
	},
	target: 'web',

	plugins: [
		new HtmlPlugin( {
			file: Path.join( appDir, 'dist', 'index.html' ),
			template: './index.html'
		} )
	]
};