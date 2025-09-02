import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksGateway } from './tasks/tasks.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'mini_kanban_db',
      entities: [],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, Tasks, TasksGateway],
})
export class AppModule {}
