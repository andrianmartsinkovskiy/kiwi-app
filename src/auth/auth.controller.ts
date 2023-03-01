import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/dto/user-auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../utils/file-uploads.utils';

@Controller('auth')
export class AuthController {
  constructor(private auth_service: AuthService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(new ValidationPipe())
  @Post('/register')
  async registerUser(
    @Req() req: Request,
    @Body() dto: RegisterUserDto,
    @Res() res: Response,
    @UploadedFile() file: { file?: Express.Multer.File },
  ) {
    await this.auth_service.registerUser(dto, file);

    return res.json({ message: 'Success register' });
  }

  @UsePipes(new ValidationPipe())
  @Post('/login')
  async login(
    @Req() req: Request,
    @Body() dto: LoginUserDto,
    @Res() res: Response,
  ) {
    const data = await this.auth_service.login(dto);

    res.cookie('refreshToken', data.tokens.refreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).send({
      status: 'success',
      userId: data.user.id,
      accessToken: data.tokens.accessToken,
      message: 'you successful login',
    });
  }
}
