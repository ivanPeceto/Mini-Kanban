import { Module, forwardRef } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskGateway } from './task.gateway';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskGateway, TaskService],
  exports: [TaskService, TaskGateway],
})
export class TaskModule {}
