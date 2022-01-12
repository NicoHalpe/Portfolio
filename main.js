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
