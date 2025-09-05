import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from './task.service';
import { BoardShape } from './entities/task.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly taskService: TaskService) {}
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
    const board = this.taskService.getBoardState();
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
