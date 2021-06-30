import React from "react";
import ReactDom from "react-dom";
import 'semantic-ui-css/semantic.min.css'

import { LoginPage } from "./components/pages/LoginPage";

export default function App() {
    return(
        <div>
        <LoginPage></LoginPage>
        </div>
    )
}

ReactDom.render(<App />, document.getElementById("app"));
