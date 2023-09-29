import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserProfile } from 'shared~type';
import { GameService } from './game.service';
import { UserService } from './user/user.service';

@WebSocketGateway(3001, {
  cors: {
    origin: '*',
  },
})
export class GameGateway implements OnGatewayDisconnect, OnGatewayInit {
  constructor(private readonly gameService: GameService, private readonly userService: UserService) {}

  async afterInit(): Promise<void> {
    const [users, userProfiles, game] = await Promise.all([
      this.userService.getUsers(),
      this.gameService.fetchCurrentUserList(),
      this.gameService.get(),
    ]);

    if (game.process === 'CROWDING') {
      users.forEach(({ nickname }) => {
        this.userService.removeUser(nickname);
      });
    }

    this.gameService.emitCurrentUserList(userProfiles);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const [game, userProfiles] = await Promise.all([this.gameService.get(), this.gameService.fetchCurrentUserList()]);

    if (game.process === 'CROWDING' && client.data.nickname) {
      this.userService.removeUser(client.data.nickname);
    }

    this.gameService.emitCurrentUserList(userProfiles);
  }

  @SubscribeMessage('setUserProfile')
  async setUserProfile(client: Socket, payload: UserProfile): Promise<boolean> {
    console.debug('setUserProfile', payload);

    const prevNickname = client.data.nickname;
    if (prevNickname && prevNickname !== payload.nickname) {
      this.userService.removeUser(client.data.nickname);
      client.leave(client.data.nickname);
    }

    client.data.nickname = payload.nickname;
    client.data.profilePictureUrl = payload.profilePictureUrl;

    if (payload.nickname) {
      client.join(payload.nickname);
      const game = await this.gameService.get();
      this.userService.setUser({
        isEntry: game.process === 'CROWDING',
        nickname: payload.nickname,
        profilePictureUrl: payload.profilePictureUrl,
      });
    }

    const userProfiles = await this.gameService.fetchCurrentUserList();
    return this.gameService.emitCurrentUserList(userProfiles);
  }
}
