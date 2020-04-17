const tf = require("@tensorflow/tfjs-node");
const {activation, optimizer, loss, metrics} = require("../helpers/directory");

let model = tf.sequential();

const kernelSize = 3;
const poolSize = [2, 2];

model.add(tf.layers.conv2d({inputShape: [28, 28, 1],filters: 32,kernelSize,activation: activation.relu}));
model.add(tf.layers.maxPool2d({poolSize}));
model.add(tf.layers.conv2d({filters: 64,kernelSize,}));
model.add(tf.layers.maxPool2d({poolSize}));
model.add(tf.layers.flatten());
model.add(tf.layers.dropout({rate: 0.5}));
model.add(tf.layers.dense({units: 512,activation: activation.relu}));
model.add(tf.layers.dense({units: 10,activation: activation.softmax}));
model.compile({
	optimizer: optimizer.rsmprop,
	loss: loss.categoricalCrossentropy,
	metrics: [metrics.accuracy]
});

module.exports = model;