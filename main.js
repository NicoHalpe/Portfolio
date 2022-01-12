document.querySelectorAll(".spanText span:not(.blank)").forEach((el) => {
	el.addEventListener("mouseover", (e) => {
		el.classList.add("animated");
	});
	el.addEventListener("animationend", (e) => {
		el.classList.remove("animated");
	});
});

var observer = new IntersectionObserver(onIntersection, {
	root: null,
	threshold: 0.4,
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

document.querySelector("form").addEventListener("submit", handleSubmit);

const handleSubmit = (e) => {
	e.preventDefault();
	let myForm = document.getElementById("pizzaOrder");
	let formData = new FormData(myForm);
	fetch("/", {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: new URLSearchParams(formData).toString(),
	})
		.then(() => {
			document.querySelector("form").reset();
			alert("Gracias por tu mensaje!");
		})
		.catch((error) => alert(error));
};

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
