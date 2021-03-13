import { PartialType } from '@nestjs/swagger';
import { RoleUserDto } from './role-user.dto';

export class UpdateRoleUserDto extends PartialType(RoleUserDto) {}
