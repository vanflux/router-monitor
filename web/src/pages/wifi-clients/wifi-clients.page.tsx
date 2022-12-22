import { WifiClientList } from "./components/wifi-client-list/wifi-client-list";
import { Grid } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import './wifi-clients.page.scss';
import { WifiClientModal } from "./components/wifi-client-modal/wifi-client-modal";

export function WifiClientsPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string>();

  const onEditClick = (id: string) => {
    setEditingId(id);
    setIsEditing(true);
  };
  const closeModal = () => setIsEditing(false);

  return <Layout>
    <div className='wifi-clients-page-container'>
      <Grid container direction='column' my={2} gap={1}>
        <WifiClientList onEditClick={onEditClick} />
      </Grid>
      <WifiClientModal open={isEditing} id={editingId} onClose={closeModal} />
    </div>
  </Layout>;
}
