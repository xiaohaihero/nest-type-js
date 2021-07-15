import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../lib/role.enum'

export const ROLES_KEY = 'roles';
export const Roles = (...args: any[]) => SetMetadata(ROLES_KEY, args);
