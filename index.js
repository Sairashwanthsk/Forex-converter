import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./styles.css";

function Converter(){
  return(
    <div className="Converter">
      <App />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render( <Converter />, rootElement );
