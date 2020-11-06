import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

// App Render
ReactDOM.render(
    <BrowserRouter basename={"/"}>
        <Route path="/" component={App} />
    </BrowserRouter>,
    document.getElementById("root")
);
