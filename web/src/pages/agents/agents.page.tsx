import { AgentList } from "./components/agent-list/agent-list";
import { AgentModal } from "./components/agent-modal/agent-modal";
import { AgentDto } from "../../api/agents/agents.dto";
import { IconButton, Grid, Modal } from "@mui/material";
import { Layout } from "../../components/layout/layout";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import './agents.page.scss';
import { AgentDeleteDialog } from "./components/agent-delete-dialog/agent-delete-dialog";

export function AgentsPage() {
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
    <div className='agents-page-container'>
      <div className='top'>
        <IconButton onClick={onAddClick} color='primary' >
          <AddIcon />
        </IconButton>
      </div>
      <div className='bottom'>
        <Grid container direction='column' my={2} gap={1}>
          <AgentList onEditClick={onEditClick} onDeleteClick={onDeleteClick} />
        </Grid>
      </div>
      <AgentModal
        open={isEditing || isCreating}
        id={editingId}
        editing={isEditing}
        onClose={closeOverlays}
      />
      <AgentDeleteDialog
        open={isDeleting}
        id={deletingId}
        onClose={closeOverlays}
      />
    </div>
  </Layout>;
}
