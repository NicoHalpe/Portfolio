class TxtType {
	constructor(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10);
		this.txt = "Nico";
		this.tick();
		this.isDeleting = true;
	}
	tick() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">&#8205;' + this.txt + "</span>";

		var that = this;
		var delta = 150 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 400;
		}

		setTimeout(function () {
			that.tick();
		}, delta);
	}
}

window.onload = function () {
	setTimeout(function () {
		var elements = document.getElementsByClassName("typewrite");
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute("data-type");
			var period = elements[i].getAttribute("data-period");
			if (toRotate) {
				new TxtType(elements[i], JSON.parse(toRotate), period);
			}
		}
	}, 1500);

	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
	let state = true;
	state = !state;
	setInterval(() => {
		state
			? (css.innerHTML =
					".typewrite > .wrap { border-right: 0.08em solid #fff}")
			: (css.innerHTML =
					".typewrite > .wrap { border-right: 0.08em solid rgba(255, 255, 255, 0) }");
		state = !state;
	}, 400);
	document.body.appendChild(css);
};
