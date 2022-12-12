import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Types } from 'mongoose';

export type WifiClientsReportDocument = HydratedDocument<WifiClientsReport>;

export type WifiClientDocument = HydratedDocument<WifiClient>;

@Schema({ _id: false })
export class WifiClientsReportClient {
  @Prop()
  mac?: string;

  @Prop()
  rssi?: number;

  @Prop()
  ip?: string;
}

export const WifiClientsReportClientSchema = SchemaFactory.createForClass(WifiClientsReportClient);

@Schema({
  id: true,
  timeseries: { timeField: 'timestamp', metaField: 'agentId', granularity: 'seconds' },
})
export class WifiClientsReport extends Document {
  @Prop()
  agentId: string;

  @Prop()
  routerType: string;
  
  @Prop({ type: [WifiClientsReportClientSchema] })
  clients: WifiClientsReportClient[];

  @Prop()
  timestamp: Date;
}

@Schema({ id: true, timestamps: { createdAt: true, updatedAt: false } })
export class WifiClient extends Document {
  @Prop({ unique: true })
  mac: string;

  @Prop()
  name: string;

  @Prop()
  createdAt: Date;
}

export const WifiClientsReportSchema = SchemaFactory.createForClass(WifiClientsReport);
export const WifiClientSchema = SchemaFactory.createForClass(WifiClient);
