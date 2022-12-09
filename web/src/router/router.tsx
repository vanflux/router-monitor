import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { LoginPage } from "../pages/login/login.page";
import { NotFoundPage } from "../pages/not-found/not-found.page";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
