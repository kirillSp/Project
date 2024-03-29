import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./Redux/Redux__store";
import App from "./App";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>
);
