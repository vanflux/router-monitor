import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { plainToInstance } from "class-transformer";
import { CronJob } from "cron";
import { Model } from "mongoose";
import { ActionsService } from "src/action/actions.service";
import { Action } from "src/action/actions.entity";
import { CreateScheduleDto, UpdateScheduleDto } from "./schedules.dto";
import { Schedule, ScheduleDocument } from "./schedules.entity";
import { parseId } from "src/utils/parse-id.util";
import { EntityNotFoundException } from "src/exceptions/entity-not-found.exception";
import { EntityUpdateException } from "src/exceptions/entity-update.exception";
import { EntityDeleteException } from "src/exceptions/entity-delete.exception";

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

  private ensureJobStarted(id: string, cron: string, rawAction: Action): void {
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

  private ensureJobStopped(id: string): void {
    const job = this.jobs.get(id);
    if (!job) return;
    job.stop();
    this.jobs.delete(id);
  }

  async getAll(): Promise<Schedule[]> {
    return await this.scheduleModel.find();
  }

  async getById(id: string): Promise<Schedule> {
    return await this.scheduleModel.findOne({ _id: parseId(id) });
  }

  async create(createScheduleDto: CreateScheduleDto): Promise<string> {
    const id = (await this.scheduleModel.create({ ...createScheduleDto }))._id.toString();
    if (createScheduleDto.active) this.ensureJobStarted(id, createScheduleDto.cron, createScheduleDto.action);
    return id;
  }

  async update(updateScheduleDto: UpdateScheduleDto): Promise<void> {
    const { matchedCount, acknowledged } = await (await this.scheduleModel.updateOne({ _id: parseId(updateScheduleDto._id) }, { ...updateScheduleDto }));
    if (!matchedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityUpdateException();
    const schedule = await this.getById(updateScheduleDto._id);
    if (schedule.active) this.ensureJobStarted(String(schedule._id), schedule.cron, schedule.action);
    if (!schedule.active) this.ensureJobStopped(String(schedule._id));
  }

  async deleteById(id: string): Promise<void> {
    const { acknowledged, deletedCount } = await (await this.scheduleModel.deleteOne({ _id: parseId(id) }));
    if (!deletedCount) throw new EntityNotFoundException();
    if (!acknowledged) throw new EntityDeleteException();
    this.ensureJobStopped(id);
  }

  stopAll(): void {
    this.jobs.forEach((_, id) => this.ensureJobStopped(id));
  }

  async startAll(): Promise<void> {
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
