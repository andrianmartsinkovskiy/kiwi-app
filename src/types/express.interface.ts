import { Users } from 'src/entities/user.entity';
import { Request } from 'express';

export interface ExpressRequestInterface extends Request {
  user?: Users;
}