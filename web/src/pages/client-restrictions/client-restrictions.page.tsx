import { ClientRestrictionList } from "./components/client-restriction-list/client-restriction-list";
import { ClientRestrictionModal } from "./components/client-restriction-modal/client-restriction-modal";
import { ClientRestrictionDeleteDialog } from "./components/client-restriction-delete-dialog/client-restriction-delete-dialog";
import { IconButton, Grid } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './client-restrictions.page.scss';

export function ClientRestrictionsPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const [editingId, setEditingId] = useState<string>();

  const onAddClick = () => setIsCreating(true);
  const onEditClick = (id: string) => {
    setEditingId(id);
    setIsEditing(true);
  };
  const onDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleting(true);
  };
  const closeOverlays = () => {
    setIsCreating(false);
    setIsDeleting(false);
    setIsEditing(false);
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
          <ClientRestrictionList onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </Grid>
      </div>
      <ClientRestrictionModal
        open={isEditing || isCreating}
        editing={isEditing}
        id={editingId}
        onClose={closeOverlays}
      />
      <ClientRestrictionDeleteDialog
        open={isDeleting}
        id={deletingId}
        onClose={closeOverlays}
      />
    </div>
  </Layout>;
}
