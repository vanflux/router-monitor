import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authorized } from 'src/auth/auth.decorator';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto, ScheduleDto, UpdateScheduleDto } from './schedules.dto';
import { plainToInstance } from 'class-transformer';
import { EntityNotFoundException } from 'src/exceptions/entity-not-found.exception';

@Controller('schedules')
@ApiTags('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  @Authorized('admin')
  @ApiResponse({ type: ScheduleDto })
  async getAll() {
    const schedules = await this.schedulesService.getAll();
    return plainToInstance(ScheduleDto, schedules.map(schedule => schedule.toJSON()));
  }

  @Get('/:id')
  @Authorized('admin')
  @ApiResponse({ type: ScheduleDto })
  async getById(@Param('id') id: string) {
    const schedule = await this.schedulesService.getById(id);
    if (!schedule) throw new EntityNotFoundException();
    return plainToInstance(ScheduleDto, schedule.toJSON());
  }

  @Post()
  @Authorized('admin')
  @ApiResponse({ type: String })
  async create(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.schedulesService.create(createScheduleDto);
  }

  @Delete('/:id')
  @Authorized('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: string) {
    return await this.schedulesService.deleteById(id);
  }

  @Patch()
  @Authorized('admin')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateScheduleDto: UpdateScheduleDto) {
    await this.schedulesService.update(updateScheduleDto);
    const schedule = await this.schedulesService.getById(updateScheduleDto._id);
    return plainToInstance(ScheduleDto, schedule.toJSON());
  }

  @Post('startAll')
  @Authorized('admin')
  @HttpCode(HttpStatus.OK)
  async startAll() {
    await this.schedulesService.startAll();
  }

  @Post('stopAll')
  @Authorized('admin')
  @HttpCode(HttpStatus.OK)
  async stopAll() {
    await this.schedulesService.stopAll();
  }
}
