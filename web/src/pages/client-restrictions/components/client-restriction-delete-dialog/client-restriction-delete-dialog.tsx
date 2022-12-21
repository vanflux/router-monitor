import { toast } from "react-toastify";
import { useDeleteClientRestrictionMutation } from "../../../../api/client-restrictions/client-restrictions.api";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../../../../components/confirmation-dialog/confirmation-dialog";

export interface ClientRestrictionDeleteDialogProps {
  open: boolean;
  id?: string;
  onClose?: () => void;
}

export function ClientRestrictionDeleteDialog({ open, id, onClose }: ClientRestrictionDeleteDialogProps) {
  const { mutate: deleteClientRestriction } = useDeleteClientRestrictionMutation(
    () => toast.error('Failed to delete client restriction!'),
    () => (toast.success('Client restriction deleted!'), onClose?.())
  );

  const onCloseDialog = (option?: boolean) => {
    if (option && id) deleteClientRestriction(id);
    onClose?.();
  };

  return (
    <ConfirmationDialog
      open={open}
      title={`Delete ${id}?`}
      onClose={onCloseDialog}
    >
      <Typography>The client restriction will be permanently deleted!</Typography>
    </ConfirmationDialog>
  );
}
