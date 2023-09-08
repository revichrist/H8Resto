import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </>
);
