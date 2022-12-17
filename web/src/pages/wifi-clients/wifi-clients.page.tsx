import { WifiClientList } from "./components/wifi-client-list/wifi-client-list";
import { WifiClientEdit } from "./components/wifi-client-edit/wifi-client-edit";
import { WifiClientDto } from "../../api/wifi-clients/wifi-clients.dto";
import { IconButton, Grid, Modal } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './wifi-clients.page.scss';

export function WifiClientsPage() {
  const [editingWifiClient, setEditingWifiClient] = useState<WifiClientDto>();

  const onEditClick = (wifiClient: WifiClientDto) => {
    setEditingWifiClient(wifiClient);
  };
  const closeModal = () => setEditingWifiClient(undefined);

  return <Layout>
    <div className='wifi-clients-page-container'>
      <div className='top'>
        <IconButton color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <WifiClientList onEditClick={onEditClick} />
        </Grid>
      </div>
      <Modal
        open={!!editingWifiClient}
        onClose={closeModal}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div className='wifi-clients-page-modal'>
          {editingWifiClient && <WifiClientEdit id={editingWifiClient._id} onClose={closeModal} />}
        </div>
      </Modal>
    </div>
  </Layout>;
}
