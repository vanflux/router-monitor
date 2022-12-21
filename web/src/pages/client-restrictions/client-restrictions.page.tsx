import { ClientRestrictionList } from "./components/client-restriction-list/client-restriction-list";
import { ClientRestrictionModal } from "./components/client-restriction-modal/client-restriction-modal";
import { ClientRestrictionDto } from "../../api/client-restrictions/client-restrictions.dto";
import { IconButton, Grid, Modal } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './client-restrictions.page.scss';

export function ClientRestrictionsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingClientRestriction, setEditingClientRestriction] = useState<ClientRestrictionDto>();

  const onAddClick = () => {
    setIsCreating(true);
  };
  const onEditClick = (clientRestriction: ClientRestrictionDto) => {
    setEditingClientRestriction(clientRestriction);
  };
  const closeModals = () => {
    setIsCreating(false);
    setEditingClientRestriction(undefined);
  };

  return <Layout>
    <div className='client-restrictions-page-container'>
      <div className='top'>
        <IconButton onClick={onAddClick} color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <ClientRestrictionList onEditClick={onEditClick} />
        </Grid>
      </div>
      <Modal
        open={!!editingClientRestriction || isCreating}
        onClose={closeModals}
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
        <div className='client-restrictions-page-modal'>
          <ClientRestrictionModal editing={!isCreating} id={editingClientRestriction?._id} onClose={closeModals} />
        </div>
      </Modal>
    </div>
  </Layout>;
}
