import { BrowserRouter, Route, Switch } from "react-router-dom";
import { WifiClientsReportsPage } from "../pages/wifi-clients-reports/wifi-clients-reports.page";
import { HomePage } from "../pages/home/home.page";
import { LoginPage } from "../pages/login/login.page";
import { NotFoundPage } from "../pages/not-found/not-found.page";
import { PAGE } from "./pages";
import { ProtectedRoute } from "./protected-route";
import { AgentsPage } from "../pages/agents/agents.page";
import { WifiClientsPage } from "../pages/wifi-clients/wifi-clients.page";

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
        <Route path={PAGE.AGENTS}>
          <ProtectedRoute>
            <AgentsPage />
          </ProtectedRoute>
        </Route>
        <Route path={PAGE.WIFI_FLIENTS}>
          <ProtectedRoute>
            <WifiClientsPage />
          </ProtectedRoute>
        </Route>
        <Route path={PAGE.REPORTS_WIFI_FLIENTS}>
          <ProtectedRoute>
            <WifiClientsReportsPage />
          </ProtectedRoute>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
