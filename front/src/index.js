import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./Component/App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { logger } from "redux-logger";
import rootReducer from "./Component/store/redux/RootReducer";
import createSagaMiddleWare from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import RootSaga from "./Component/store/saga/RootSaga";
import rootSaga from "./Component/store/saga/RootSaga";

const sagaMiddleWare = createSagaMiddleWare();

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)));
sagaMiddleWare.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
