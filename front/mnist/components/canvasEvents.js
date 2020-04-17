export default function canvasEvents(id) {
	let canvas, context, tool;
	canvas = document.getElementById(id);
	context = canvas.getContext('2d');
	context.lineWidth = 10;
	context.strokeStyle = "#c2c2c2";
	tool = new tool_pencil();
	canvas.addEventListener('mousedown', ev_canvas, false);
	canvas.addEventListener('mousemove', ev_canvas, false);
	canvas.addEventListener('mouseup',   ev_canvas, false);
	return {context,canvas};
	// Здесь мы будем ловить движения мыши
	function tool_pencil () {
		let tool = this;
		this.started = false;


		this.mousedown = function (ev) {
			context.beginPath();
			context.moveTo(ev._x, ev._y);
			tool.started = true;
		};

		// Эта функция вызывается каждый раз, когда вы перемещаете мышь.
		// Но рисование происходит только когда вы удерживаете кнопку мыши
		// нажатой.
		this.mousemove = function (ev) {
			if (tool.started) {
				context.lineTo(ev._x, ev._y);
				context.stroke();
			}
		};

		// Событие при отпускании мыши
		this.mouseup = function (ev) {
			if (tool.started) {
				tool.mousemove(ev);
				tool.started = false;
			}
		};
	}
	function ev_canvas (ev) {
		if (ev.layerX || ev.layerX === 0) { // Firefox
			ev._x = ev.layerX;
			ev._y = ev.layerY;
		} else if (ev.offsetX || ev.offsetX === 0) { // Opera
			ev._x = ev.offsetX;
			ev._y = ev.offsetY;
		}

		// Вызываем обработчик события tool
		let func = tool[ev.type];
		if (func) {
			func(ev);
		}
	}
}