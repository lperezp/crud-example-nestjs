import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { Task, StatusTask } from '../models/tasks.models';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
import { FilterTasksDTO } from '../dto/filterTasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tskService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDTO: FilterTasksDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tskService.getTasksWithFilter(filterDTO);
    } else {
      return this.tskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTask: CreateTasksDTO) {
    return this.tskService.createTask(createTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tskService.deleteTask(id);
  }

  @Put('/:id')
  updateTask(@Param('id') id: string, @Body('status') status: StatusTask) {
    return this.tskService.updateTask(id, status);
  }
}
