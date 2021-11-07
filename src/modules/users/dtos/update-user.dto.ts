import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { Column } from 'typeorm';
import { User } from '../entities/user.entity';

export class UpdateUserPasswordDto extends PickType(User, [
  'password',
] as const) {
  @IsOptional()
  @IsString()
  @Column({
    type: 'varchar',
    length: 767,
  })
  public newPassword?: string;
}
