let directory = {
	activation: {
		relu: "relu",
		softmax: "softmax",
	},
	optimizer: {
		rsmprop: "rmsprop"
	},
	loss: {
		categoricalCrossentropy: "categoricalCrossentropy"
	},
	metrics: {
		accuracy: "accuracy"
	}
};

module.exports = directory;