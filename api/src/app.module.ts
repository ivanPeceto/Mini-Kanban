import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskGateway } from './task/task.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/entities/task.entity';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mini_kanban_db',
      entities: [Task],
      synchronize: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, Task, TaskGateway],
})
export class AppModule {}
