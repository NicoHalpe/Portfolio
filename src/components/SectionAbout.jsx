import React, { useEffect, useRef } from "react";
import "./SectionAbout.css";
import useIntersectionObserver from "../useIntersectionObserver";

export default function SectionAbout() {
	const ref = useRef();
	const onScreen = useIntersectionObserver(ref, { rootMargin: "-150px" });

	useEffect(() => {
		if (onScreen) ref.current.classList.add("visible");
	}, [onScreen]);

	return (
		<section id="about" ref={ref}>
			<div className="content">
				<object
					id="programming-svg"
					type="image/svg+xml"
					data="/img/programming.svg"
					aria-label="Foto decorativa"
				>
					<img height="300" width="300" src="/img/programming.svg" alt="Foto decorativa" />
				</object>
				<div className="text">
					<h2 className="spanText">
						<span>S</span>
						<span>o</span>
						<span>b</span>
						<span>r</span>
						<span>e</span>
						<span className="blank"> </span>
						<span>M</span>
						<span>í</span>
					</h2>
					<p>
						Soy Nicolás Halperin, tengo 16 años y desde hace 3 me estoy adentrando en el mundo de la
						programación y el desarrollo. Desde chico que estoy interesado en todo el tema de la tecnología,
						siempre buscando soluciones para automatizar tareas de manera simple. Con este incentivo comencé a
						programar, haciendo aplicaciones básicas que den solución a problemas de la vida cotidiana. Con el
						tiempo fui aprendiendo nuevos lenguajes y mejorando mis prácticas, por lo que en este momento
						puedo crear soluciones más complejas, como páginas web, aplicaciones para Windows o móviles, APIs
						y mucho más. A nivel académico, actualmente estoy cursando 5º año de la secundaria con Orientación
						en Tecnologías de la Información y la Comunicación en la Escuela ORT.
					</p>
				</div>
			</div>
			<a className="scroll-down r" href="#skills" title="ir a la seccion habilidades">
				<span>scroll down</span>
				<svg viewBox="0 0 448 512" aria-label="flecha">
					<path
						fill="currentColor"
						d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"
					></path>
				</svg>
			</a>
			<a className="scroll-down l" href="#skills" title="ir a la seccion habilidades">
				<span>scroll down</span>
				<svg viewBox="0 0 448 512" aria-label="flecha">
					<path
						fill="currentColor"
						d="M443.5 248.5l-7.1-7.1c-4.7-4.7-12.3-4.7-17 0L241 419.9V44c0-6.6-5.4-12-12-12h-10c-6.6 0-12 5.4-12 12v375.9L28.5 241.4c-4.7-4.7-12.3-4.7-17 0l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l211 211.1c4.7 4.7 12.3 4.7 17 0l211-211.1c4.8-4.8 4.8-12.3.1-17z"
					></path>
				</svg>
			</a>
		</section>
	);
}