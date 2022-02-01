export default function register() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker
			.register("worker.js")
			.then(
				function (registration) {},
				function (err) {}
			)
			.catch(function (err) {});
	}
}