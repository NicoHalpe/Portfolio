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
	useEffect(() => {
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
				<SectionProyects />
			</Suspense>
			<Suspense fallback={<section className="contact"></section>}>
				<SectionContact />
			</Suspense>
		</>
	);
}

export default App;
