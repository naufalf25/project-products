import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./states/index.js";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
