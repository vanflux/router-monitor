import { ActionDto } from "../actions/actions.dto";

export interface ScheduleDto {
  _id: string;
  cron: string;
  action: ActionDto;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateScheduleDto = Omit<ScheduleDto, '_id' | 'createdAt' | 'updatedAt'>;

export type UpdateScheduleDto = Partial<CreateScheduleDto> & Pick<ScheduleDto, '_id'>;
