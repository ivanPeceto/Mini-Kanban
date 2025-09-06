import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { BoardShape } from './entities/task.entity';

@WebSocketGateway({
  cors: {
    origin: `http://localhost:${process.env.FRONTEND_PORT ?? 4200}`,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    const board = await this.taskService.getBoardState();
    client.emit('board:snapshot', board);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  /**
   * Método para actualizar el tablero kanban a todos los clientes
   * @param updatePayload Ejemplo de uso: { type: 'created', task: Task }
   */
  public broadcastUpdate(updatePayload: any) {
    this.server.emit('board:update', updatePayload);
    console.log(`Emitido update a todos los clientes...`);
  }
}
