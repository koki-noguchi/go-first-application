import React from "react";
import ReactDom from "react-dom";

export default function App() {
    return(<div>Hello World</div>)
}

ReactDom.render(<App />, document.getElementById("app"));
