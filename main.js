var observer = new IntersectionObserver(onIntersection, {
	root: null,
	rootMargin: "-150px",
});

function onIntersection(entries, opts) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add("visible");
			observer.unobserve(entry.target);
		}
	});
}
document.querySelectorAll("section").forEach((elem) => {
	observer.observe(elem);
});

document.querySelectorAll("a").forEach((el) => {
	el.addEventListener("click", (e) => {
		const href = el.getAttribute("href");
		if (href.includes("#")) {
			e.preventDefault();
			document.querySelector(href).scrollIntoView();
		}
	});
});

document.querySelectorAll(".spanText span:not(.blank)").forEach((el) => {
	el.addEventListener("mouseover", (e) => {
		el.classList.add("animated");
	});
	el.addEventListener("animationend", (e) => {
		el.classList.remove("animated");
	});
});

const handleSubmit = (e) => {
	e.preventDefault();
	let form = document.getElementById("contact-form");
	let formData = new FormData(form);
	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(formData).toString(),
	})
		.then(() => {
			form.reset();
			document.querySelector(".form-submit-wrapper").classList.add("visible");
			setTimeout(() => {
				document.querySelector(".form-submit-wrapper").classList.remove("visible");
				document.querySelector(".form-submit-wrapper").classList.add("leave");
				setTimeout(() => {
					document.querySelector(".form-submit-wrapper").classList.remove("leave");
				}, 800);
			}, 3000);
		})
		.catch((error) => alert(error));
};

document.querySelector("form").addEventListener("submit", handleSubmit);

[...document.querySelectorAll("#me .content h1 span")].map((el, i) => {
	el.style.setProperty("animation-delay", `${i * 50}ms`, "");
	el.classList.add("bounceIn");
	el.addEventListener("animationend", (e) => {
		if (e.animationName === "bounceIn") {
			el.style.setProperty("opacity", "1", "");
			el.classList.remove("bounceIn");
			el.style.setProperty("animation-delay", "", "");
		}
	});
});

//#region Animated Blob

import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

const path = document.querySelector("path");
const path2 = document.getElementById("react-path-2");
const root = document.documentElement;
let started = false;

let hueNoiseOffset = 0;
let noiseStep = 0.0005;

const simplex = new SimplexNoise();

const points = createPoints();

function animate() {
	path.setAttribute("d", spline(points, 1, true));
	path2.setAttribute("d", spline(points, 1, true));

	const coords = path.getBoundingClientRect();
	const hoverelement = document.getElementById("hoverelement");
	hoverelement.style.setProperty("left", `${coords.left}px`, "");
	hoverelement.style.setProperty("top", `${coords.top}px`, "");
	hoverelement.style.setProperty("width", `${coords.width}px`, "");
	hoverelement.style.setProperty("height", `${coords.height}px`, "");

	for (let i = 0; i < points.length; i++) {
		const point = points[i];

		const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
		const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
		const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
		const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

		point.x = x;
		point.y = y;

		point.noiseOffsetX += noiseStep;
		point.noiseOffsetY += noiseStep;
	}

	hueNoiseOffset += noiseStep / 6;

	requestAnimationFrame(animate);
}

animate();

function map(n, start1, end1, start2, end2) {
	return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function noise(x, y) {
	return simplex.noise2D(x, y);
}

function createPoints() {
	const points = [];
	const numPoints = 5;
	const angleStep = (Math.PI * 2) / numPoints;
	const rad = 78;

	for (let i = 1; i <= numPoints; i++) {
		const theta = i * angleStep;

		const x = 100 + Math.cos(theta) * rad;
		const y = 100 + Math.sin(theta) * rad;

		points.push({
			x: x,
			y: y,
			originX: x,
			originY: y,
			noiseOffsetX: Math.random() * 1000,
			noiseOffsetY: Math.random() * 1000,
		});
	}

	return points;
}

document.querySelector("#me #hoverelement").addEventListener("mouseover", () => {
	noiseStep = 0.001;
	if (!started) {
		animate();
		started = true;
	}
});

document.querySelector("#me #hoverelement").addEventListener("mouseleave", () => {
	noiseStep = 0.0005;
});

//#endregion

//#region Registrar el Service Worker (PWA)

if ("serviceWorker" in navigator) {
	window.addEventListener("load", function () {
		navigator.serviceWorker
			.register("worker.js")
			.then(
				function (registration) {},
				function (err) {}
			)
			.catch(function (err) {
				console.log(err);
			});
	});
} else {
	console.log("Service Worker is not supported by browser.");
}

//#endregion
