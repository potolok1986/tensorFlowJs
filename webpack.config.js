'use strict';

const path = require('path');
const frontPath = path.join(__dirname, "front");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const pages = require("./config/configs").pages;

let entities = {};
let plugins = [];

pages.forEach(({name}) => {
	let path = `${frontPath}/${name}/${name}`;
	entities[name] = path + '.js';
	plugins.push(
		new HtmlWebpackPlugin({
			inject: true,
			filename: name + '.html',
			template: path + '.html',
			chunks: [name]
		})
	)

});

module.exports = {
	entry: entities,
	output: {
		path: path.join(__dirname, "build"),
		publicPath: "/",
		filename: 'src/[name].js'
	},
	plugins,
	devtool: 'source-map',
};
