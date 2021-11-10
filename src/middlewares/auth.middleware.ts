import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { INVALID_ACCESS_TOKEN_ERROR_MESSAGE } from 'src/constants/exception-messages';
import { UserGrade, UserRole } from 'src/modules/users/entities/user.entity';

export interface PayloadDto {
  id: number;
  role: UserRole;
  grade?: UserGrade;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  readonly AUTH_URL: string;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const { authorization } = request.headers;

    /** authorization check */
    if (!authorization)
      throw new UnauthorizedException(INVALID_ACCESS_TOKEN_ERROR_MESSAGE);

    const [type, token] = authorization.split(' ');

    if (type.toLowerCase() !== 'bearer')
      throw new UnauthorizedException(INVALID_ACCESS_TOKEN_ERROR_MESSAGE);

    let verifiedToken: PayloadDto;

    /** token validate */
    try {
      verifiedToken = await this.validate({ token });
    } catch (error) {
      throw new UnauthorizedException(INVALID_ACCESS_TOKEN_ERROR_MESSAGE);
    }

    /** inject account information in request */
    request.account = {
      id: verifiedToken.id,
      role: verifiedToken.role,
      grade: verifiedToken.grade,
    };

    next();
  }

  private validate({ token }: { token: string }): PayloadDto {
    const verifiedToken = this.jwtService.verify(token, {
      secret: this.configService.get<string>('auth.jwtAccessSecret'),
    });

    return verifiedToken;
  }
}
