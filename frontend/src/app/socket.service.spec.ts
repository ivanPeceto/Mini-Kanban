import { TestBed } from '@angular/core/testing';

import { Socket } from './socket.service';

describe('SocketService', () => {
  let service: Socket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Socket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
