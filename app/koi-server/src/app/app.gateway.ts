import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class AppGateway {
  constructor() {}
}
