import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.jsx";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./state/store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
