
export interface ActionDto {
  _id: string;
  data: ActionDataDto;
}

export interface ActionDataDto {
  type: string;
}

export interface LogActionDataDto {
  type: 'log';
  message: string;
}
