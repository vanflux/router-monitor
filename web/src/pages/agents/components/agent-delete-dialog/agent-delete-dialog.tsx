import { toast } from "react-toastify";
import { useDeleteAgentMutation } from "../../../../api/agents/agents.api";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../../../../components/confirmation-dialog/confirmation-dialog";

export interface AgentDeleteDialogProps {
  open: boolean;
  id?: string;
  onClose?: () => void;
}

export function AgentDeleteDialog({ open, id, onClose }: AgentDeleteDialogProps) {
  const { mutate: deleteAgent } = useDeleteAgentMutation(
    () => toast.error('Failed to delete agent!'),
    () => (toast.success('Agent deleted!'), onClose?.())
  );

  const onCloseDialog = (option?: boolean) => {
    if (option && id) deleteAgent(id);
    onClose?.();
  };

  return (
    <ConfirmationDialog
      open={open}
      title={`Delete ${id}?`}
      onClose={onCloseDialog}
    >
      <Typography>The agent will be permanently deleted!</Typography>
    </ConfirmationDialog>
  );
}
