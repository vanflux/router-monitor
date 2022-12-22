import { Redirect } from "react-router-dom";
import { PAGE } from "../../router/pages";

export function NotFoundPage() {
  return <Redirect to={PAGE.HOME} />;
}
