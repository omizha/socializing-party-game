import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // getUserProfile(@Query('nickname') nickname: string): Promise<UserEntity> {
  //   return this.userService.getUserProfile(nickname);
  // }

  // @Post()
  // setUserProfile(@Body() body: UserEntity): Promise<UserEntity> {
  //   return this.userService.setUserProfile(body);
  // }
}
