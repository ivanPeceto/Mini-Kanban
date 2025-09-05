import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/task/entities/task.entity';
import { Repository } from 'typeorm';

describe('Tasks Controller (e2e)', () => {
  let app: INestApplication;
  let taskRepository: Repository<Task>;
  let createdTaskId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    taskRepository = moduleFixture.get<Repository<Task>>(
      getRepositoryToken(Task),
    );
  });

  //Limpia la bd despues de cada prueba
  afterEach(async () => {
    await taskRepository.query('DELETE FROM task');
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /tasks - Tiene que crear una nueva task', () => {
    const createTaskDto = { title: 'Test e2e task.' };
    return request(app.getHttpServer())
      .post('/tasks')
      .send(createTaskDto)
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual({
          id: expect.any(String),
          title: createTaskDto.title,
          description: null,
          column: 'todo',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        });
        createdTaskId = response.body.id;
      });
  });
  it('GET /board - Debe devolver el estado del tablero', async () => {
    await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Another Test Task' });

    return request(app.getHttpServer())
      .get('/tasks/board')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('todo');
        expect(response.body).toHaveProperty('doing');
        expect(response.body).toHaveProperty('done');
        expect(response.body.todo).toHaveLength(1);
        expect(response.body.todo[0].title).toBe('Another Test Task');
      });
  });

  it('PATCH /tasks/:id/move - Debe mover una tarea a otra columna', async () => {
    const taskResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Task to move' });
    const taskId = taskResponse.body.id;

    return request(app.getHttpServer())
      .patch(`/tasks/${taskId}/move`)
      .send({ column: 'doing' })
      .expect(200)
      .then((response) => {
        expect(response.body.column).toBe('doing');
      });
  });

  it('DELETE /tasks/:id - Debe eliminar una tarea', async () => {
    const taskResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send({ title: 'Task to delete' });
    const taskId = taskResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/tasks/${taskId}/delete`)
      .expect(200);

    return request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(404);
  });
});
