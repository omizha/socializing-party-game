import { OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserSchema } from 'shared~type';
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
      this.userService.fetchCurrentUserList(),
      this.gameService.get(),
    ]);

    // 게임이 시작되었을 때는 유저를 그대로 보존한다.
    if (game.gamePhase === 'CROWDING') {
      users.forEach(({ nickname }) => {
        this.userService.removeUser(nickname);
      });
    }

    this.userService.emitCurrentUserList(userProfiles);
  }

  async handleDisconnect(client: Socket): Promise<void> {
    const [game, userProfiles] = await Promise.all([this.gameService.get(), this.userService.fetchCurrentUserList()]);

    this.userService.emitCurrentUserList(userProfiles);
  }

  @SubscribeMessage('setUserProfile')
  async setUserProfile(client: Socket, payload: UserSchema): Promise<boolean> {
    console.debug('setUserProfile', client.id, payload);

    const prevNickname = client.data.nickname;
    if (prevNickname && prevNickname !== payload.nickname) {
      this.userService.removeUser(client.data.nickname);
      client.leave(client.data.nickname);
    }

    client.data.nickname = payload.nickname;

    if (payload.nickname) {
      client.join(payload.nickname);
      this.userService.setUser({
        isEntry: true,
        nickname: payload.nickname,
        profilePictureUrl: payload.profilePictureUrl,
        team: Math.random() > 0.5 ? 'L' : 'R',
      });
    }

    const userProfiles = await this.userService.fetchCurrentUserList();
    return this.userService.emitCurrentUserList(userProfiles);
  }
}
