/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { useEffect, useState, lazy, Suspense } from "react";

import SectionMe from "./components/SectionMe";
//import SectionAbout from "./components/SectionAbout";
//import SectionSkills from "./components/SectionSkills";
//import SectionProyects from "./components/SectionProyects";
//import SectionContact from "./components/SectionContact";
const SectionAbout = lazy(() => import("./components/SectionAbout"));
const SectionSkills = lazy(() => import("./components/SectionSkills"));
const SectionProyects = lazy(() => import("./components/SectionProyects"));
const SectionContact = lazy(() => import("./components/SectionContact"));

function App() {
	const [images, setImages] = useState();
	const startCard = 3;
	const [cardWidth, setCardWidth] = useState();
	const [mobileDif, setMobileDif] = useState(0);
	useEffect(() => {
		setImages(document.querySelector("#proyects .cards"));

		const onResize = (e) => {
			let cw;
			let mb;
			if (window.innerWidth < 1000) {
				setCardWidth(window.innerWidth * 0.8 + 10);
				cw = window.innerWidth * 0.8 + 10;
				setMobileDif(window.innerWidth * 0.1);
				mb = window.innerWidth * 0.1;
			} else {
				setCardWidth(460);
				cw = 460;
				setMobileDif(0);
				mb = 0;
			}

			if (images) images.style.transform = `translate(-${startCard * cw - mb}px)`;
		};
		window.addEventListener("resize", onResize);

		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [images, cardWidth, startCard, mobileDif]);

	useEffect(() => {
		if (window.innerWidth < 1000) {
			setCardWidth(window.innerWidth * 0.8 + 10);
			setMobileDif(window.innerWidth * 0.1);
		} else {
			setCardWidth(460);
			setMobileDif(0);
		}

		document.querySelectorAll("a").forEach((el) => {
			el.addEventListener("click", (e) => {
				const href = el.getAttribute("href");
				if (href.includes("#")) {
					e.preventDefault();
					document.querySelector(href).scrollIntoView();
				}
			});
		});

		document.querySelectorAll(`object[data-src]`).forEach((element) => {
			element.data = element.getAttribute("data-src");
			element.removeAttribute("data-src");
		});
	}, []);

	return (
		<>
			<SectionMe />
			<Suspense fallback={<section className="about"></section>}>
				<SectionAbout />
			</Suspense>
			<Suspense fallback={<section className="skills"></section>}>
				<SectionSkills />
			</Suspense>
			<Suspense fallback={<section className="proyects"></section>}>
				<SectionProyects images={images} startCard={startCard} cardWidth={cardWidth} mobileDif={mobileDif} />
			</Suspense>
			<Suspense fallback={<section className="contact"></section>}>
				<SectionContact />
			</Suspense>
		</>
	);
}

export default App;
