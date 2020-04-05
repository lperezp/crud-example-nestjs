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
  getTasks(@Query(ValidationPipe) filterDTO: FilterTasksDTO): Promise<Task[]> {
    return this.tskService.getTasks(filterDTO);
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tskService.getTaskById(id);
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
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    this.tskService.deleteTask(id);
  }

  @Put('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: StatusTask,
  ) {
    return this.tskService.updateTask(id, status);
  }
}
