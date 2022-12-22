import { Modal } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useWifiClientByIdQuery, useUpdateWifiClientMutation } from "../../../../api/wifi-clients/wifi-clients.api";
import { UpdateWifiClientDto } from "../../../../api/wifi-clients/wifi-clients.dto";
import './wifi-client-modal.scss';

export interface WifiClientModalProps {
  open?: boolean;
  id?: string;
  onClose?: () => void;
}

export function WifiClientModal({ open, id, onClose }: WifiClientModalProps) {
  const { data: wifiClient } = useWifiClientByIdQuery(id);

  const { mutate: update } = useUpdateWifiClientMutation(
    () => toast.error('Failed to update wifi client!'),
    () => (toast.success('Wifi client updated!'), onClose?.())
  );

  const onSubmit = (data: UpdateWifiClientDto) => update(data);

  const { control, handleSubmit, reset } = useForm<UpdateWifiClientDto>();

  useEffect(() => {
    if (open && wifiClient) reset(wifiClient);
  }, [open, wifiClient]);

  return (
    <Modal
      open={open || false}
      onClose={onClose}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <div className='wifi-clients-page-modal'>
        <form className='wifi-client-modal-container' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5'>Editing {wifiClient?.name}</Typography>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <TextField
                label='Name'
                inputRef={input => input && input.focus()}
                {...field}
                value={field.value || ''}
              />
            )}
          />
          <Button type='submit' variant='contained'>Save</Button>
        </form>
      </div>
    </Modal>
  );
}
