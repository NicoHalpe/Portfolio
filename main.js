var observer = new IntersectionObserver(onIntersection, {
	root: null,
	rootMargin: "-150px",
});

const sections = ["me", "about", "skills", "proyects", "contact"];

function onIntersection(entries, opts) {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			if (entry.target.tagName === "SECTION") {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
				const nextSectionId =
					sections[sections.findIndex((val) => val === entry.target.id) + 1];
				if (nextSectionId) {
					document
						.querySelectorAll(
							`#${nextSectionId} img[data-src], #${entry.target.id} img[data-src]`
						)
						.forEach((element) => {
							element.src = element.getAttribute("data-src");
							element.removeAttribute("data-src");
						});
				}
			}
			if (entry.target.id === "skills") {
				let tilt = document.createElement("script");
				tilt.src = "tilt.min.js";
				document.head.appendChild(tilt);
			} else if (entry.target.id === "proyects") {
				let sEvents = document.createElement("script");
				sEvents.src = "swiped-events.min.js";
				document.head.appendChild(sEvents);
			} else if (entry.target.id === "carrousel") {
				if (!entry.isIntersecting || window.innerWidth > 1000) return;
				setTimeout(() => {
					entry.target.classList.add("visible");
					setTimeout(() => {
						entry.target.classList.remove("visible");
					}, 1000);
				}, 5000);
			}
		}
	});
}
document.querySelectorAll("section").forEach((elem) => {
	observer.observe(elem);
});

observer.observe(document.querySelector("#carrousel"));

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
				document
					.querySelector(".form-submit-wrapper")
					.classList.remove("visible");
				document.querySelector(".form-submit-wrapper").classList.add("leave");
				setTimeout(() => {
					document
						.querySelector(".form-submit-wrapper")
						.classList.remove("leave");
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

//#region Carrousel

const images = document.querySelector("#proyects .cards");
const firstCardClone = images.children[0].cloneNode(true);
const lastCardClone =
	images.children[images.children.length - 1].cloneNode(true);

const originals = [];
document.querySelectorAll("#proyects .card").forEach((el) => {
	const cl = el.cloneNode(true);
	cl.classList.remove("visible");
	originals.push(cl);
});

images.insertBefore(lastCardClone, images.children[0]);
images.appendChild(firstCardClone);

let currentCard = 3;
let cardWidth;
if (window.innerWidth < 1000) {
	cardWidth = window.innerWidth * 0.8 + 10;
} else {
	cardWidth = 460;
}
images.style.transform = `translate(-${currentCard * cardWidth}px)`;

images.addEventListener("swiped", (e) => {
	switch (e.detail.dir) {
		case "right":
			handleCardClickNeg(1);
			break;
		case "left":
			handleCardClickPos(1);
			break;
	}
});

images.addEventListener("mousedown", (e) => {
	e.path.forEach((element) => {
		if (element.classList && element.classList.contains("card")) {
			const children = Array.prototype.slice.call(images.children);
			const index = children.indexOf(element);
			const dif = index - currentCard;
			if (dif > 0) handleCardClickPos(dif);
			else if (dif < 0) handleCardClickNeg(-dif);
		}
	});
});

let currentOriginalPos = 1;
const handleCardClickPos = (dif) => {
	images.style.setProperty("pointer-events", "none");
	currentCard += dif;
	images.style.transitionDuration = "0.5s";
	images.style.transform = `translate(-${currentCard * cardWidth}px)`;
	for (var i = 0; i < dif; i++) {
		const clone = originals[currentOriginalPos].cloneNode(true);
		const clE = images.appendChild(clone);
		clE.getElementsByTagName("img")[0].src = clE
			.getElementsByTagName("img")[0]
			.getAttribute("data-src");
		clE.getElementsByTagName("img")[0].removeAttribute("data-src");
		currentOriginalPos += 1;
		if (currentOriginalPos > originals.length - 1) {
			currentOriginalPos = currentOriginalPos - originals.length;
		}
	}
	images.children[currentCard].classList.add("visible");
	images.children[currentCard - dif].classList.remove("visible");

	setTimeout(() => {
		images.style.setProperty("pointer-events", "all");
		currentCard -= dif;
		for (var i = 0; i < dif; i++) {
			images.children[0].remove();
		}
		images.style.transitionDuration = "0s";
		images.style.transform = `translate(-${currentCard * cardWidth}px)`;
	}, 500);
	currentOriginalNeg -= dif;
	if (currentOriginalNeg <= 0) {
		currentOriginalNeg = currentOriginalNeg + originals.length;
	}
};

let currentOriginalNeg = 2;
const handleCardClickNeg = (dif) => {
	images.style.setProperty("pointer-events", "none");
	currentCard -= dif;

	images.children[currentCard + dif].classList.remove("visible");
	images.children[currentCard].classList.add("visible");

	for (var i = 0; i < dif; i++) {
		const clone =
			originals[originals.length - currentOriginalNeg].cloneNode(true);
		const clE = images.insertBefore(clone, images.children[0]);
		clE.getElementsByTagName("img")[0].src = clE
			.getElementsByTagName("img")[0]
			.getAttribute("data-src");
		clE.getElementsByTagName("img")[0].removeAttribute("data-src");
		currentOriginalNeg += 1;
		if (currentOriginalNeg > originals.length) {
			currentOriginalNeg = currentOriginalNeg - originals.length;
		}
	}
	images.style.transitionDuration = "0s";
	images.style.transform = `translate(-${(3 + dif) * cardWidth}px)`;

	setTimeout(() => {
		images.style.transitionDuration = "0.5s";
		images.style.transform = `translate(-${3 * cardWidth}px)`;
	}, 10);

	setTimeout(() => {
		images.style.setProperty("pointer-events", "all");
		currentCard += dif;
		for (var i = 0; i < dif; i++) {
			images.children[images.children.length - 1].remove();
		}
	}, 500);
	currentOriginalPos -= dif;
	if (currentOriginalPos < 0) {
		currentOriginalPos = currentOriginalPos + originals.length;
		console.log(currentOriginalPos);
	}
};
//#endregion

//#region Animated Blob

import { spline } from "https://cdn.skypack.dev/@georgedoescode/spline@1.0.1";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@2.4.0";

const setupAvatar = () => {
	const path = avatar.contentDocument.querySelector("path");
	const path2 = avatar.contentDocument.getElementById("react-path-2");
	const transform = avatar.contentDocument.getElementById("transform");
	transform.setAttribute("transform", "translate(845.000000, 1130.000000)");
	path2.setAttribute("transform", "translate(0, -5)");

	let noiseStep = 0.0005;
	const simplex = new SimplexNoise();
	const points = createPoints();

	function animate() {
		path.setAttribute("d", spline(points, 1, true));
		path2.setAttribute("d", spline(points, 1, true));

		const coords = path.getBoundingClientRect();
		const avararCords = avatar.getBoundingClientRect();
		const hoverelement = document.getElementById("hoverelement");
		hoverelement.style.setProperty(
			"left",
			`${coords.left + avararCords.left}px`,
			""
		);
		hoverelement.style.setProperty(
			"top",
			`${coords.top + avararCords.top}px`,
			""
		);
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

	document
		.querySelector("#me #hoverelement")
		.addEventListener("mouseover", () => {
			noiseStep = 0.001;
		});

	document
		.querySelector("#me #hoverelement")
		.addEventListener("mouseleave", () => {
			noiseStep = 0.0005;
		});
};

const avatar = document.getElementById("avatar");
if (avatar.contentDocument)
	avatar.contentDocument.addEventListener("load", setupAvatar);
avatar.addEventListener("load", setupAvatar);

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
