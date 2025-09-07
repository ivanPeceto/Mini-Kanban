import {
  Injectable,
  NotFoundException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardShape, Task } from './entities/task.entity';
import { TaskGateway } from './task.gateway';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @Inject(forwardRef(() => TaskGateway))
    private readonly taskGateway: TaskGateway,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    const taskData = await this.taskRepository.save(task);
    this.taskGateway.broadcastUpdate({
      type: 'created',
      task: taskData,
    });
    return taskData;
  }

  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getBoardState(): Promise<BoardShape> {
    const allTasks = await this.taskRepository.find();

    const board = allTasks.reduce(
      (acc, task) => {
        if (!acc[task.column]) {
          acc[task.column] = [];
        }
        acc[task.column].push(task);
        return acc;
      },
      { todo: [], doing: [], done: [] } as BoardShape,
    );

    return board;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException(`Task con ID "${id}" no encontrada.`);
    }
    return task;
  }

  async moveTask(id: string, moveTaskDto: MoveTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    task.column = moveTaskDto.column;

    const savedTask = await this.taskRepository.save(task);

    this.taskGateway.broadcastUpdate({
      type: 'moved',
      task: savedTask,
    });

    return savedTask;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    const savedTask = await this.taskRepository.save(task);

    this.taskGateway.broadcastUpdate({
      type: 'updated',
      task: savedTask,
    });

    return savedTask;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.taskRepository.delete(id);

    if (deleted.affected === 0) {
      throw new NotFoundException(`Task con ID "${id}" no encontrada.`);
    }

    this.taskGateway.broadcastUpdate({
      type: 'deleted',
      task_id: id,
    });

  }
}
