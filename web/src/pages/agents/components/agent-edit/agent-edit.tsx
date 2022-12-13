import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../../components/confirmation-dialog/confirmation-dialog";
import { PasswordTextInput } from "../../../../components/password-text-input/password-text-input";
import { useAgentByIdQuery, useRegenAgentSecretMutation, useUpdateAgentMutation } from "../../../../features/agents/agents.api";
import { AgentDto, UpdateAgentDto } from "../../../../features/agents/agents.dto";
import './agent-edit.scss';

export interface AgentEditProps {
  id: string;
  onClose?: () => void;
}

export function AgentEdit({ id, onClose }: AgentEditProps) {
  const { data: agent } = useAgentByIdQuery(id);

  const { mutate: update } = useUpdateAgentMutation(() => {
    toast.error('Failed to update agent!');
  }, () => {
    toast.success('Agent updated!');
    onClose?.();
  });

  const { mutate: regenSecret } = useRegenAgentSecretMutation(() => {
    toast.error('Failed to update secret!');
  }, () => {
    toast.success('Secret regenerated!');
  });

  const [regenSecretConfirmOpen, setRegenSecretConfirmOpen] = useState(false);

  const openRegenSecretConfirm = () => setRegenSecretConfirmOpen(true);

  const onRegenSecretClose = (option?: boolean) => {
    setRegenSecretConfirmOpen(false);
    if (agent && option) regenSecret(agent._id);
  };

  const onSubmit = (data: UpdateAgentDto) => update(data);

  const { control, handleSubmit, reset } = useForm<UpdateAgentDto>();

  useEffect(() => {
    if (agent) reset(agent);
  }, [agent]);

  return <form className='agent-edit-container' onSubmit={handleSubmit(onSubmit)}>
    <Typography variant='h5'>Editing {agent?.name}</Typography>
    <Controller
      name='name'
      control={control}
      render={({ field }) => <TextField label='Name' {...field} value={field.value || ''} />}
    />
    <div className='regen-secret'>
      <PasswordTextInput value={agent?.secret || ''} className='secret-input' disabled type='password' label='Secret' />
      <Button onClick={openRegenSecretConfirm} variant='outlined'>Regen Secret</Button>
    </div>
    <Button type='submit' variant='contained'>Save</Button>
    <ConfirmationDialog
      open={regenSecretConfirmOpen}
      onClose={onRegenSecretClose}
      title='Regenerate secret?'
    >
      <Typography>The current secret will be invalidated!</Typography>
    </ConfirmationDialog>
  </form>
}
