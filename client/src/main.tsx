import "./index.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { TransactionProvider } from "@project/context";

ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>,
  document.getElementById("root")
);
