import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/types/user-roles.type';

export const ROLES_KEY= 'roles';

export const Roles = (...args: UserRole[]) => SetMetadata(ROLES_KEY, args);