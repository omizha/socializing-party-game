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
    return { result: !!(await this.userService.removeUser(nickname)) };
  }

  @Delete('/all')
  async removeAllUser(): Promise<{ result: boolean }> {
    return { result: !!(await this.userService.removeAllUser()) };
  }
}
