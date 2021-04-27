import React from "react";
import "./App.css";
import * as T from "@template/precedent-iso";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{T.name}</p>
      </header>
    </div>
  );
}

export default App;
