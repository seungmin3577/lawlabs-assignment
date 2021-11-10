import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User, UserGrade, UserRole } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {
  SignUpAdminReqDto,
  SignUpUserReqDto,
  SignUpResDto,
  SignInResDto,
  SignInReqDto,
} from './dtos/auth.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { INVALID_USER_ERROR_MESSAGE } from 'src/constants/exception-messages';
import {
  ACCESS_EXPIRE_TIME,
  REFRESH_EXPIRE_TIME,
} from 'src/constants/auth-configuration';

@Injectable()
export class AuthService {
  private accessSecretKey: string;
  private refreshSecretKey: string;

  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.accessSecretKey = this.configService.get('auth.jwtAccessSecret');
    this.refreshSecretKey = this.configService.get('auth.jwtRefreshSecret');
  }

  async signUpForAdmin(signUpDto: SignUpAdminReqDto): Promise<SignUpResDto> {
    const { email, password, role } = signUpDto;
    const user = await this.userService.createUser({
      email,
      password: this.hashingPassword(password),
      role,
    });

    return { userId: user.userId };
  }

  async signUp(signUpDto: SignUpUserReqDto): Promise<SignUpResDto> {
    const { email, password } = signUpDto;
    const user = await this.userService.createUser({
      email,
      password: this.hashingPassword(password),
      role: UserRole.회원,
      grade: UserGrade.일반회원,
    });

    return { userId: user.userId };
  }

  async signIn(signInDto: SignInReqDto): Promise<SignInResDto> {
    const { email, password } = signInDto;

    const user = await this.userService.findUserByEmail({ email });

    if (!user) throw new UnauthorizedException(INVALID_USER_ERROR_MESSAGE);

    const isValid = await bcrypt.compare(user.password, password);

    if (isValid) {
      const { accessToken, refreshToken } = await this.createTokens(user);
      user.refreshToken = refreshToken;

      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException(INVALID_USER_ERROR_MESSAGE);
    }
  }

  private hashingPassword(planText: string): string {
    const salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(planText, salt);
  }

  private createTokens(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload: { id: number; role: UserRole; grade?: UserGrade } = {
      id: user.userId,
      role: user.role,
      grade: user?.grade ?? null,
    };

    const accessToken = jwt.sign(payload, this.accessSecretKey, {
      expiresIn: ACCESS_EXPIRE_TIME,
    });

    const refreshToken = jwt.sign(payload, this.refreshSecretKey, {
      expiresIn: REFRESH_EXPIRE_TIME,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
