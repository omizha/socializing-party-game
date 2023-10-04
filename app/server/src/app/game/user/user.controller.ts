import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('/game/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    const users = this.userService.getUsers();
    return users;
  }

  @Post()
  setUser(@Body() body: User): Promise<User> {
    return this.userService.setUser(body);
  }

  @Delete()
  async removeUser(@Query('nickname') nickname: string): Promise<{ result: boolean }> {
    await this.userService.removeUser(nickname);
    const userList = await this.userService.fetchCurrentUserList();
    const result = this.userService.emitCurrentUserList(userList);
    return { result };
  }

  // @Get()
  // getUserProfile(@Query('nickname') nickname: string): Promise<UserEntity> {
  //   return this.userService.getUserProfile(nickname);
  // }

  // @Post()
  // setUserProfile(@Body() body: UserEntity): Promise<UserEntity> {
  //   return this.userService.setUserProfile(body);
  // }
}
