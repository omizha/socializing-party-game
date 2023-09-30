import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { SocketModule } from '../../socket/socket.module';
import { User, userSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserGateway } from './user.gateway';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }]), SocketModule],
  providers: [UserService, UserGateway],
})
export class UserModule {}
