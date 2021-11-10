import { plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  Development = 'dev',
  Production = 'prod',
  Local = 'local',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  readonly NODE_ENV: Environment;

  @Type(() => Number)
  @IsNumber()
  readonly PORT: number;

  @IsString()
  readonly JWT_ACCESS_SECRET: string;

  @IsString()
  readonly JWT_REFRESH_SECRET: string;

  @IsString()
  readonly DATABASE_HOST: string;

  @Type(() => Number)
  @IsNumber()
  readonly DATABASE_PORT: number;

  @IsString()
  readonly DATABASE_USER: string;

  @IsString()
  readonly DATABASE_PASSWORD: string;

  @IsString()
  readonly DATABASE_NAME: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
