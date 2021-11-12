import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpUserReqDto,
  SignUpResDto,
  SignInResDto,
  SignInReqDto,
} from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HttpCode(201)
  signUp(@Body() signUpUserReqDto: SignUpUserReqDto): Promise<SignUpResDto> {
    return this.authService.signUp(signUpUserReqDto);
  }

  @Post('/sign-in')
  signIn(@Body() signInReqDto: SignInReqDto): Promise<SignInResDto> {
    return this.authService.signIn(signInReqDto);
  }
}
