import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { User } from 'src/modules/users/entities/user.entity';

export class SignUpUserReqDto extends PickType(User, [
  'email',
  'password',
] as const) {}

export class SignUpResDto extends PickType(User, ['userId'] as const) {}

export class SignInReqDto extends PickType(User, [
  'email',
  'password',
] as const) {}

export class SignInResDto {
  @IsString()
  public accessToken: string;
  @IsString()
  public refreshToken: string;
}
