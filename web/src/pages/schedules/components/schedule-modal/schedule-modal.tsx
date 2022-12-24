import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useScheduleByIdQuery, useCreateScheduleMutation, useUpdateScheduleMutation } from "../../../../api/schedules/schedules.api";
import { CreateScheduleDto, UpdateScheduleDto } from "../../../../api/schedules/schedules.dto";
import { Button, Checkbox, FormControlLabel, Modal } from "@mui/material";
import { Cron } from "react-js-cron";
import './schedule-modal.scss';
import 'react-js-cron/dist/styles.css'
import { ActionEditor } from "../../../../components/action-editor/action-editor";

export interface ScheduleModalProps {
  open?: boolean;
  id?: string;
  editing?: boolean;
  onClose?: () => void;
}

export function ScheduleModal({ open, id, editing, onClose }: ScheduleModalProps) {
  const { data: fetchedSchedule } = useScheduleByIdQuery(id);

  const { mutate: create } = useCreateScheduleMutation(
    () => toast.error('Failed to create schedule!'),
    () => (toast.success('Schedule created!'), onClose?.())
  );

  const { mutate: update } = useUpdateScheduleMutation(
    () => toast.error('Failed to update schedule!'),
    () => (toast.success('Schedule updated!'), onClose?.())
  );

  const onSubmit = (data: CreateScheduleDto & UpdateScheduleDto) => editing ? update(data) : create(data);

  const { control, handleSubmit, reset } = useForm<CreateScheduleDto & UpdateScheduleDto>();

  useEffect(() => {
    if (open && !editing) reset({ active: true, cron: '* * * * *' });
    if (open && editing && fetchedSchedule) reset(fetchedSchedule);
  }, [open, fetchedSchedule]);

  return (
    <Modal
      open={open || false}
      onClose={onClose}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <div className='schedule-modal'>
        <form className='schedule-modal-container' onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='h5'>{editing ? `Editing ${fetchedSchedule?._id}` : 'Creating'}</Typography>
          <Controller
            name='cron'
            control={control}
            render={({ field }) => (
              <Cron
                className='cron'
                value={field.value}
                setValue={(value: string) => field.onChange(value)}
              />
            )}
          />
          <Controller
            name='action'
            control={control}
            render={({ field }) => (
              <ActionEditor value={field.value} onChange={field.onChange} />
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
