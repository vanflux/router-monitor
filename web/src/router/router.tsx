import { BrowserRouter, Route, Switch } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/dashboard.page";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login/login.page";
import { NotFoundPage } from "../pages/not-found/not-found.page";
import { PAGE } from "./pages";
import { ProtectedRoute } from "./protected-route";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={PAGE.HOME}>
          <HomePage />
        </Route>
        <Route path={PAGE.LOGIN}>
          <LoginPage />
        </Route>
        <Route path={PAGE.DASHBOARD}>
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
