import { FLOAT } from 'sequelize';
import { BelongsToManySetAssociationsMixin, UUID, UUIDV4 } from 'sequelize';
import { Table, Model, CreatedAt, Column, PrimaryKey, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Agent } from 'src/agents/agents.entity';
import { PartialDeep } from 'type-fest';

@Table({ tableName: 'wifi_clients_report' })
export class WifiClientsReport extends Model {
  @PrimaryKey
  @Column({ type: UUID, defaultValue: UUIDV4 })
  id: string;

  @ForeignKey(() => Agent)
  @Column({ type: UUID })
  agentId: string;

  @BelongsTo(() => Agent)
  agent: Agent;
  
  @BelongsToMany(() => WifiClient, () => WifiClientsReportClient)
  clients: WifiClient[];

  @CreatedAt
  createdAt: Date;

  setClients!: BelongsToManySetAssociationsMixin<WifiClient, number>;
}

@Table({ tableName: 'wifi_client' })
export class WifiClient extends Model {
  @PrimaryKey
  @Column
  mac: string;

  @Column({ allowNull: true })
  name: string;

  @BelongsToMany(() => WifiClientsReport, () => WifiClientsReportClient)
  reports: WifiClientsReport[];

  @CreatedAt
  createdAt: Date;

  wifiClientsReportClient!: PartialDeep<WifiClientsReportClient>;
}

@Table({ tableName: 'wifi_clients_report_client', modelName: 'wifiClientsReportClient' })
export class WifiClientsReportClient extends Model {
  @ForeignKey(() => WifiClientsReport)
  @Column({ type: UUID })
  reportId: string;

  @ForeignKey(() => WifiClient)
  @Column
  clientMac: string;

  @Column({ type: FLOAT, allowNull: true })
  rssi?: number;

  @Column({ allowNull: true })
  hostname?: string;

  @Column({ allowNull: true })
  ip?: string;
}
