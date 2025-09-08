import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-connection-status',
  imports: [],
  templateUrl: './connection-status.html',
  styleUrl: './connection-status.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConnectionStatus {
  private socketService = inject(SocketService);
  isConnected = this.socketService.isConnected;
}