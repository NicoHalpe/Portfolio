import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(<App />, document.getElementsByTagName("body")[0]);

serviceWorkerRegistration();