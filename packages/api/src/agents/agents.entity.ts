import { Table, Model, CreatedAt, UpdatedAt, Column } from 'sequelize-typescript';

@Table({ tableName: 'agents' })
export class Agent extends Model {
  @Column
  secret: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
