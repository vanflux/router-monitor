import { ReactNode } from "react";
import { Redirect } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store"
import { PAGE } from "./pages";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLogged } = useAuthStore();
  if (!isLogged) return <Redirect to={PAGE.LOGIN} />
  return children;
}
