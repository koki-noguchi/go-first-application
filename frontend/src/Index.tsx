import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'

import { Router } from "./router/Router";

export default function App() {
    return(
        <BrowserRouter>
            <Router></Router>
        </BrowserRouter>
    )
}

ReactDom.render(<App />, document.getElementById("app"));
