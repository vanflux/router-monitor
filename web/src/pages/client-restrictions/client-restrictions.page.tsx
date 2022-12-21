import { ClientRestrictionList } from "./components/client-restriction-list/client-restriction-list";
import { ClientRestrictionEdit } from "./components/client-restriction-edit/client-restriction-edit";
import { ClientRestrictionDto } from "../../api/client-restrictions/client-restrictions.dto";
import { IconButton, Grid, Modal } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './client-restrictions.page.scss';

export function ClientRestrictionsPage() {
  const [editingClientRestriction, setEditingClientRestriction] = useState<ClientRestrictionDto>();

  const onEditClick = (clientRestriction: ClientRestrictionDto) => {
    setEditingClientRestriction(clientRestriction);
  };
  const closeModal = () => setEditingClientRestriction(undefined);

  return <Layout>
    <div className='client-restrictions-page-container'>
      <div className='top'>
        <IconButton color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <ClientRestrictionList onEditClick={onEditClick} />
        </Grid>
      </div>
      <Modal
        open={!!editingClientRestriction}
        onClose={closeModal}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div className='client-restrictions-page-modal'>
          {editingClientRestriction && <ClientRestrictionEdit id={editingClientRestriction._id} onClose={closeModal} />}
        </div>
      </Modal>
    </div>
  </Layout>;
}
