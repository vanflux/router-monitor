import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { CronJob } from "cron";
import { Model, Types } from "mongoose";
import { ActionsService } from "src/action/actions.service";
import { Action } from "src/action/actions.entity";
import { CreateScheduleDto, UpdateScheduleDto } from "./schedules.dto";
import { Schedule, ScheduleDocument } from "./schedules.entity";

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);
  private jobs = new Map<string, CronJob>();

  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<ScheduleDocument>,
    private readonly configService: ConfigService,
    private readonly actionsService: ActionsService,
  ) {
    this.startAll();
  }

  private ensureJobStarted(id: string, cron: string, rawAction: Action) {
    const action = plainToInstance(Action, rawAction);
    const existentJob = this.jobs.get(id);
    if (existentJob) existentJob.stop();
    const job = new CronJob(
      cron,
      () => this.actionsService.run(action).catch(exc => this.logger.error(exc)),
      null,
      true,
      this.configService.get('tz', { infer: true }),
    );
    this.jobs.set(id, job);
  }

  private ensureJobStopped(id: string) {
    const job = this.jobs.get(id);
    if (!job) return;
    job.stop();
    this.jobs.delete(id);
  }

  async getAll(): Promise<Schedule[]> {
    return await this.scheduleModel.find();
  }

  async getById(id: string): Promise<Schedule> {
    return await this.scheduleModel.findOne({ _id: new Types.ObjectId(id) });
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<string> {
    const id = (await this.scheduleModel.create({ ...createScheduleDto }))._id.toString();
    if (createScheduleDto.active) this.ensureJobStarted(id, createScheduleDto.cron, createScheduleDto.action);
    return id;
  }

  async update(updateScheduleDto: UpdateScheduleDto): Promise<boolean> {
    const { acknowledged } = await (await this.scheduleModel.updateOne({ _id: new Types.ObjectId(updateScheduleDto._id) }, { ...updateScheduleDto }));
    if (!acknowledged) return false;
    const schedule = await this.getById(updateScheduleDto._id);
    if (schedule.active) this.ensureJobStarted(String(schedule._id), schedule.cron, schedule.action);
    if (!schedule.active) this.ensureJobStopped(String(schedule._id));
    return true;
  }

  async deleteById(id: string) {
    const { acknowledged } = await (await this.scheduleModel.deleteOne({ _id: new Types.ObjectId(id) }));
    this.ensureJobStopped(id);
    return acknowledged;
  }

  stopAll() {
    this.jobs.forEach((_, id) => this.ensureJobStopped(id));
  }

  async startAll() {
    try {
      const schedules = await this.getAll();
      schedules.forEach(schedule => {
        try {
          if (schedule.active) this.ensureJobStarted(String(schedule.id), schedule.cron, schedule.action);
        } catch (exc) {
          this.logger.error({
            schedule,
            exc,
          });
        }
      });
    } catch (exc) {
      this.logger.error('Start all failed', exc);
    }
  }
}
