const mnistRouter = require("../mnist/mnistRouter");
const express = require('express');
const router = express.Router();
const path = require('path');
const pages = require("../../config/configs").pages;

let Routes = class Routes {
	constructor(app) {
		this.app = app;
		this.createPages();
		this.api()
	}

	createPages(){
		pages.forEach(({name, url}) => {
			this.app.use(url, this.createPage(name, url))
		});
	}

	createPage(name, url){
		return router.get(url, async function (req, res, next) {
			try {
				res.sendFile(path.join(__dirname, `../../build/${name}.html`));
			} catch (err) {
				next(err);
			}
		});
	}

	api(){
		this.app.post("/api/mnist-predict", mnistRouter)
	}
};
module.exports = Routes;