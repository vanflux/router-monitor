import { Layout } from "../../components/layout/layout";
import { WifiClientsContent } from "./components/wifi-clients-content/wifi-clients-content";

export function DashboardPage() {
  return <Layout>
    <WifiClientsContent />
  </Layout>;
}
