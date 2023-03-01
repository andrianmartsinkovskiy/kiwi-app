import {
  Controller,
  Get, Param, Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { UserRole } from 'src/types/user-roles.type';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guards';

@Controller('user')
export class UserController {
  constructor(private user_service: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('/allUsers')
  async getAllUsers(@Res() res: Response) {
    const users = await this.user_service.getAllUsers();

    res.json({
      users,
    });
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER, UserRole.LEGAL)
  @Get('/getUser/:id')
  async getUser(
    @Req() req: Request,
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    const user = await this.user_service.getUser(id);

    res.json(user);
  }
}
