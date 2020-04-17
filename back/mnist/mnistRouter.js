const tf = require("@tensorflow/tfjs-node");

let mnistRouter = async function (req, res, next) {
	try {
		let {tensor} = req.body;
		let tensor4d = tf.tensor(Object.values(tensor)).as4D(1,28, 28, 1);
		const loadedModel = await tf.loadLayersModel('file://models/mnist/model.json');
		let predict = loadedModel.predict(tensor4d);
		res.send({
			result: Array.from(predict.argMax(1).dataSync())[0],
			matrix: predict.dataSync(),
		});
	}catch (e) {
		next(e)
	}
};

module.exports = mnistRouter;