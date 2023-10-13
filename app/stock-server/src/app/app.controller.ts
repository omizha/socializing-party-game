import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'shared~type';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/user/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: join(__dirname, '..', '..', 'public', 'avatar'),
    }),
  )
  uploadAvatar(@UploadedFile() file: Express.Multer.File): Response.UploadAvatar {
    console.log(file);
    return { file };
  }
}
