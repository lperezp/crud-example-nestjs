import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateTasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
import { FilterTasksDTO } from '../dto/filterTasks.dto';
import { TaskStatusValidationPipe } from '../pipes/pipes-status-validation.pipe';
import { StatusTask } from '../enum/status-task.enum';
import { Task } from '../entities/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/modules/auth/decorators/get-user.decorator';
import { User } from 'src/modules/auth/entities/auth.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDTO: FilterTasksDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tskService.getTasks(filterDTO, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tskService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTask: CreateTasksDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tskService.createTask(createTask, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    this.tskService.deleteTask(id, user);
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: StatusTask,
    @GetUser() user: User,
  ) {
    return this.tskService.updateTask(id, status, user);
  }
}
