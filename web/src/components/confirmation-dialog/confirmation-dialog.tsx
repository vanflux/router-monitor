import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

export interface ConfirmationDialogProps extends Omit<DialogProps, 'onClose'> {
  open: boolean;
  onClose?: (option?: boolean) => void;
  title?: string;
  children?: ReactNode;
}

export default function ConfirmationDialog({ open, onClose, title, children }: ConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={() => onClose?.()}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose?.(true)}>Yes</Button>
        <Button onClick={() => onClose?.(false)} autoFocus>No</Button>
      </DialogActions>
    </Dialog>
  );
}
