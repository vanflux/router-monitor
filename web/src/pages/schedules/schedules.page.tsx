import { ScheduleList } from "./components/schedule-list/schedule-list";
import { ScheduleModal } from "./components/schedule-modal/schedule-modal";
import { IconButton, Grid } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { ScheduleDeleteDialog } from "./components/schedule-delete-dialog/schedule-delete-dialog";
import './schedules.page.scss';

export function SchedulesPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string>();
  const [editingId, setEditingId] = useState<string>();

  const onAddClick = () => setIsCreating(true);
  const onDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsDeleting(true);
  };
  const onEditClick = (id: string) => {
    setEditingId(id);
    setIsEditing(true);
  };
  const closeOverlays = () => {
    setIsCreating(false);
    setIsDeleting(false);
    setIsEditing(false);
  };

  return <Layout>
    <div className='schedules-page-container'>
      <div className='top'>
        <IconButton onClick={onAddClick} color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <ScheduleList onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </Grid>
      </div>
      <ScheduleModal
        open={isEditing || isCreating}
        id={editingId}
        editing={isEditing}
        onClose={closeOverlays}
      />
      <ScheduleDeleteDialog
        open={isDeleting}
        id={deletingId}
        onClose={closeOverlays}
      />
    </div>
  </Layout>;
}
