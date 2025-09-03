import { Module } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskGateway } from './task.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [],
  providers: [TaskGateway],
})
export class TaskModule {}
