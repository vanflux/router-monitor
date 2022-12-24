import { toast } from "react-toastify";
import { useDeleteScheduleMutation } from "../../../../api/schedules/schedules.api";
import Typography from "@mui/material/Typography";
import ConfirmationDialog from "../../../../components/confirmation-dialog/confirmation-dialog";

export interface ScheduleDeleteDialogProps {
  open: boolean;
  id?: string;
  onClose?: () => void;
}

export function ScheduleDeleteDialog({ open, id, onClose }: ScheduleDeleteDialogProps) {
  const { mutate: deleteSchedule } = useDeleteScheduleMutation(
    () => toast.error('Failed to delete schedule!'),
    () => (toast.success('Schedule deleted!'), onClose?.())
  );

  const onCloseDialog = (option?: boolean) => {
    if (option && id) deleteSchedule(id);
    onClose?.();
  };

  return (
    <ConfirmationDialog
      open={open}
      title={`Delete ${id}?`}
      onClose={onCloseDialog}
    >
      <Typography>The schedule will be permanently deleted!</Typography>
    </ConfirmationDialog>
  );
}
