import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementById("body"));

serviceWorkerRegistration();