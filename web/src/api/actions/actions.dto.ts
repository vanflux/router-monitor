
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

export interface ClientRestrictionActiveActionDataDto {
  type: 'client-restriction:active';
  clientId: string;
  active: boolean;
}

export interface ActionLogDto {
  _id: string;
  message: string;
  createdAt: string;
}

