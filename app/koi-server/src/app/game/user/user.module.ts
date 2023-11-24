import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { User, userSchema } from './user.schema';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  providers: [UserService],
})
export class UserModule {}
