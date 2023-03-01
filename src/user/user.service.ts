import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import {JSONFile} from "@nestjs/schematics/dist/utils/json-file.util";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private user_repository: Repository<Users>,
  ) {}

  async getAllUsers() {
    return await this.user_repository.find({
      select: ['id', 'login'],
    });
  }

  async getUser(id: number) {
    const user = await this.user_repository.findOne({ where: { id } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    const file = JSON.parse(user.file);

    return {
      user: {
        id: user.id,
        login: user.login,
        file: {
          path: `/files/${file.filename}`,
          name: file.originalname,
        },
      },
    };
  }
}
