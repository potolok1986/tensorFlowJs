const MnistDataset = require("./MnistDataset");
const model = require("./model");
const fs = require('fs');
const mnistDataset = new MnistDataset();
const modelPath = "models/mnist";

createModel().then(()=> {
	console.log("model created!!")
});

async function createModel() {
	await mnistDataset.loadData();
	model.summary();
	const {images: trainImages, labels: trainLabels} = mnistDataset.getTrainData();
	await model.fit(
		trainImages, trainLabels, {
			epochs: 20,
			validationSplit: 0.15,
			batchSize: 128,
			callbacks: {
				onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
			}
		}
	);

	const {images: testImages, labels: testLabels} = mnistDataset.getTestData();
	const evalOutput = model.evaluate(testImages, testLabels);
	console.log(
		`\nEvaluation result:\n` +
		`  Loss = ${evalOutput[0].dataSync()[0].toFixed(3)}; `+
		`Accuracy = ${evalOutput[1].dataSync()[0].toFixed(3)}`);

	if (!fs.existsSync(modelPath)) {
		fs.mkdirSync("models")
	}
	await model.save(`file://${modelPath}`);
	console.log(`Saved model to path: ${modelPath}`);

}