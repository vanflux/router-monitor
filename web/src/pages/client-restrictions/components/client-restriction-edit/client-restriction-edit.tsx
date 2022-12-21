import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useClientRestrictionByIdQuery, useUpdateClientRestrictionMutation } from "../../../../api/client-restrictions/client-restrictions.api";
import { UpdateClientRestrictionDto } from "../../../../api/client-restrictions/client-restrictions.dto";
import { WifiClientSelector } from "../../../../components/wifi-client-selector/wifi-client-selector";
import './client-restriction-edit.scss';

export interface ClientRestrictionEditProps {
  id: string;
  onClose?: () => void;
}

export function ClientRestrictionEdit({ id, onClose }: ClientRestrictionEditProps) {
  const { data: clientRestriction } = useClientRestrictionByIdQuery(id);

  const { mutate: update } = useUpdateClientRestrictionMutation(
    () => toast.error('Failed to update client restriction!'),
    () => (toast.success('Client restriction updated!'), onClose?.())
  );

  const onSubmit = (data: UpdateClientRestrictionDto) => update(data);

  const { control, handleSubmit, reset } = useForm<UpdateClientRestrictionDto>();

  useEffect(() => {
    if (clientRestriction) reset(clientRestriction);
  }, [clientRestriction]);

  return <form className='client-restriction-edit-container' onSubmit={handleSubmit(onSubmit)}>
    <Typography variant='h5'>Editing {clientRestriction?.clientId}</Typography>
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
        <FormGroup>
          <FormControlLabel control={<Checkbox {...field} checked={field.value || false} />} label="Active" />
        </FormGroup>
      )}
    />
    <Button type='submit' variant='contained'>Save</Button>
  </form>
}
