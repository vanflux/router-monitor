import { Table, Model, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table
export class Agent extends Model {
  @CreatedAt
  creationAt: Date;

  @UpdatedAt
  updatedat: Date;
}
