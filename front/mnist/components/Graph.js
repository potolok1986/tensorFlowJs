export default class Graph {
	constructor(el) {
		this.$el = $(el);
		this.$el.addClass('d-flex').css({
			minHeight: 70,
		});
		this.clear([]);
	}

	render(values = []) {
		let $cols = [];
		for (let i = 0; i < 10; i++) {
			let $col = $(this.col);
			let val = ((values[i] || 0) * 100).toFixed(2);
			$col.find(".js-value").html(`${i}: <b>${val}%</b>`);
			$col.find(".js-col").css({
				height: Math.floor(val < 10 ? 5 : (val / 2))
			});
			$cols.push($col);
		}
		this.$el.html($cols);
	}

	get col() {
		return '<div class="d-flex flex-column justify-content-end js-group align-items-center mr-3">\n    <div class="js-col" style="width: 25px; background: blue; border-radius: 2px"></div>\n    <div class="js-value mt-2 small"></div>\n</div>'
	}

	clear() {
		this.render([]);
	}

}