import canvasEvents from "./components/canvasEvents";
import Graph from "./components/Graph";

$(function () {
	let {context, canvas} = canvasEvents('myCanvas');
	let myCanvasZip = document.getElementById("myCanvasZip");
	let graph = new Graph(".js-result-graph");
	$(".js-clear-canvas").on("click", e => {
		context.clearRect(0, 0, 280, 280);
		$(".js-result").text("");
		graph.clear();
		myCanvasZip.getContext("2d").clearRect(0, 0, 28, 28);
	});
	$(".js-send-canvas").on("click", async function () {
		let tensor = tf.browser.fromPixels(canvas, 1).asType("float32");
		tensor = tf.image.resizeBilinear(tensor, [28, 28]);
		tensor = tensor.div(255);
		await tf.browser.toPixels(tensor, myCanvasZip);
		tensor = tensor.expandDims();
		let response = await fetch("/api/mnist-predict", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({tensor: tensor.dataSync()})
		});
		let {result, matrix} = await response.json();
		$(".js-result").text(result);
		graph.render(Object.values(matrix).map(item => +item.toFixed(5)))
	});
});


