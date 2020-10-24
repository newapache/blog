import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import MyRouter from "./routes/Router";
import "./assets/custom.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {/* 어떤 path가 요청됐을 때 어떤 컴포넌트로 갈 지 정의된 곳  */}
        <MyRouter />
      </ConnectedRouter>
    </Provider>
  );
};

export default App;
