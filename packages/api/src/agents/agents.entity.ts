import { UUID, UUIDV4 } from 'sequelize';
import { Table, Model, CreatedAt, UpdatedAt, Column, PrimaryKey } from 'sequelize-typescript';

@Table({ tableName: 'agents' })
export class Agent extends Model {
  @PrimaryKey
  @Column({ type: UUID, defaultValue: UUIDV4 })
  id: string;

  @Column
  secret: string;

  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
