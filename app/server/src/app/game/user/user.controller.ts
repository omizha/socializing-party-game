import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Model } from 'mongoose';
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
  removeUser(@Query('nickname') nickname: string): Promise<ReturnType<Model<User>['deleteMany']>> {
    return this.userService.removeUser(nickname);
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
