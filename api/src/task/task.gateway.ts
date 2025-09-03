import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TaskGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Cliente conectado: ${client.id}`);
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
