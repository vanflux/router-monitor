import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PasswordTextInput } from "../../../../components/password-text-input/password-text-input";
import { useAgentByIdQuery, useCreateAgentMutation, useRegenAgentSecretMutation, useUpdateAgentMutation } from "../../../../api/agents/agents.api";
import { CreateAgentDto, UpdateAgentDto } from "../../../../api/agents/agents.dto";
import { Modal } from "@mui/material";
import ConfirmationDialog from "../../../../components/confirmation-dialog/confirmation-dialog";
import './agent-modal.scss';

export interface AgentModalProps {
  open?: boolean;
  id?: string;
  editing?: boolean;
  onClose?: () => void;
}

export function AgentModal({ open, id, editing, onClose }: AgentModalProps) {
  const { data: fetchedAgent } = useAgentByIdQuery(id);

  const { mutate: create } = useCreateAgentMutation(
    () => toast.error('Failed to create agent!'),
    () => (toast.success('Agent created!'), onClose?.())
  );

  const { mutate: update } = useUpdateAgentMutation(
    () => toast.error('Failed to update agent!'),
    () => (toast.success('Agent updated!'), onClose?.())
  );

  const { mutate: regenSecret } = useRegenAgentSecretMutation(
    () => toast.error('Failed to update secret!'),
    () => toast.success('Secret regenerated!'),
  );

  const [regenSecretConfirmOpen, setRegenSecretConfirmOpen] = useState(false);

  const openRegenSecretConfirm = () => setRegenSecretConfirmOpen(true);

  const onRegenSecretClose = (option?: boolean) => {
    setRegenSecretConfirmOpen(false);
    if (fetchedAgent && option) regenSecret(fetchedAgent._id);
  };

  const onSubmit = (data: CreateAgentDto & UpdateAgentDto) => editing ? update(data) : create(data);

  const { control, handleSubmit, reset, watch } = useForm<CreateAgentDto & UpdateAgentDto>();
  const name = watch('name');

  useEffect(() => {
    if (open && !editing) reset({});
    if (open && editing && fetchedAgent) reset(fetchedAgent);
  }, [open, fetchedAgent]);

  return (
    <Modal
      open={open || false}
      onClose={onClose}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <div className='agents-modal'>
        <form className='agent-modal-container' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5'>Editing {name}</Typography>
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
          {editing && <div className='regen-secret'>
            <PasswordTextInput value={fetchedAgent?.secret || ''} className='secret-input' disabled type='password' label='Secret' />
            <Button onClick={openRegenSecretConfirm} variant='outlined'>Regen Secret</Button>
          </div>}
          <Button type='submit' variant='contained'>Save</Button>
          <ConfirmationDialog
            open={regenSecretConfirmOpen}
            onClose={onRegenSecretClose}
            title='Regenerate secret?'
          >
            <Typography>The current secret will be invalidated!</Typography>
          </ConfirmationDialog>
        </form>
      </div>
    </Modal>
  );
}
