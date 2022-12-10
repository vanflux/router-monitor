import { Redirect } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store"
import { PAGE } from "./pages";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isLogged } = useAuthStore();
  if (!isLogged) return <Redirect to={PAGE.LOGIN} />
  return children;
}
