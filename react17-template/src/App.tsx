import React, { useEffect } from "react";
import { Router, Link, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { routeConfigs } from "./router/routeConfigs";
import { IRouteConfig } from "./router/IRouteConfig";
import history from "./router/history";

function App() {
  let defaultPage;
  const defaultConfig = routeConfigs.find((c) => c.isDev);
  if (defaultConfig) {
    defaultPage = <Redirect path="/" to={defaultConfig.path} />;
  }
  return (
    <div>
      <Router history={history}>
        <div>
          <Switch>
            {routeConfigs.map((item, index) => {
              return <RouteWithSubRoutes key={index} {...item} />;
            })}
            {defaultPage}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

function RouteWithSubRoutes(route: IRouteConfig) {
  useEffect(() => {
    document.title = route.title;
  });
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.children} />
      )}
    />
  );
}

export default App;
