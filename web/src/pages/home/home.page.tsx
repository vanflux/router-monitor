import { Redirect } from "react-router-dom";
import { PAGE } from "../../router/pages";
import { useAuthStore } from "../../stores/auth.store";

export function HomePage() {
  const { isLogged } = useAuthStore();
  if (isLogged) return <Redirect to={PAGE.REPORTS_WIFI_FLIENTS} />;
  return <Redirect to={PAGE.LOGIN} />
}
