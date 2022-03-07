import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { TransactionProvider } from "./components/Transactions";

ReactDOM.render(
  <TransactionProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionProvider>,
  document.getElementById("root")
);
