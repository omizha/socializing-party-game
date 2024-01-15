import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('/stock/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query('stockId') stockId: string): Promise<User[]> {
    const users = await this.userService.getUserList(stockId);
    return users;
  }

  @Post()
  setUser(@Body() body: User): Promise<User> {
    return this.userService.setUser(body);
  }

  @Delete()
  async removeUser(@Query('stockId') stockId: string, @Query('userId') userId: string): Promise<{ result: boolean }> {
    return { result: !!(await this.userService.removeUser(stockId, userId)) };
  }

  @Delete('/all')
  async removeAllUser(@Query('stockId') stockId: string): Promise<{ result: boolean }> {
    return { result: !!(await this.userService.removeAllUser(stockId)) };
  }
}
