import { Checkbox, FormControlLabel, Modal } from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useClientRestrictionByIdQuery, useCreateClientRestrictionMutation, useUpdateClientRestrictionMutation } from "../../../../api/client-restrictions/client-restrictions.api";
import { CreateClientRestrictionDto, UpdateClientRestrictionDto } from "../../../../api/client-restrictions/client-restrictions.dto";
import { WifiClientSelector } from "../../../../components/wifi-client-selector/wifi-client-selector";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import './client-restriction-modal.scss';

export interface ClientRestrictionModalProps {
  open?: boolean;
  editing?: boolean;
  id?: string;
  onClose?: () => void;
}

export function ClientRestrictionModal({ open, editing, id, onClose }: ClientRestrictionModalProps) {
  const { data: fetchedClientRestriction } = useClientRestrictionByIdQuery(open ? id : undefined);

  const { mutate: create } = useCreateClientRestrictionMutation(
    () => toast.error('Failed to create client restriction!'),
    () => (toast.success('Client restriction created!'), onClose?.())
  );

  const { mutate: update } = useUpdateClientRestrictionMutation(
    () => toast.error('Failed to update client restriction!'),
    () => (toast.success('Client restriction updated!'), onClose?.())
  );

  const onSubmit = (data: CreateClientRestrictionDto & UpdateClientRestrictionDto) => {
    editing ? update(data) : create(data);
  };

  const { control, handleSubmit, reset, watch } = useForm<CreateClientRestrictionDto & UpdateClientRestrictionDto>();
  const clientId = watch('clientId');

  useEffect(() => {
    if (open && !editing) reset({});
    if (open && editing && fetchedClientRestriction) reset(fetchedClientRestriction);
  }, [open, fetchedClientRestriction]);

  return (
    <Modal
      open={open || false}
      onClose={onClose}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <div className='client-restriction-modal'>
        <form className='client-restriction-modal-container' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5'>{editing ? 'Editing' : 'Creating'} {clientId}</Typography>
          <Controller
            name='clientId'
            control={control}
            render={({ field }) => (
              <WifiClientSelector
                value={field.value}
                onChange={wifiClient => field?.onChange(wifiClient?._id)}
              />
            )}
          />
          <Controller
            name='active'
            control={control}
            render={({ field }) => (
              <FormControlLabel control={<Checkbox {...field} checked={field.value || false} />} label="Active" />
            )}
          />
          <Button type='submit' variant='contained'>Save</Button>
        </form>
      </div>
    </Modal>
  );
}
