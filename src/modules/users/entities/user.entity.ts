import { PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  관리자 = 'ADMIN',
  회원 = 'MEMBER',
}

export enum UserGrade {
  일반회원 = 'GENERAL',
  중요회원 = 'IMPORTANT',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Type(() => Number)
  readonly userId: number;

  @IsEmail()
  @Column({
    type: 'varchar',
    length: '767',
  })
  public email: string;

  @IsString()
  @Column({
    type: 'varchar',
    length: 1000,
  })
  public password: string;

  @IsEnum(UserRole)
  @Column({
    type: 'enum',
    enum: UserRole,
  })
  public role: UserRole;

  @IsEnum(UserGrade)
  @IsOptional()
  @Column({
    type: 'enum',
    enum: UserGrade,
    nullable: true,
  })
  public grade?: UserGrade;

  @IsString()
  @IsOptional()
  @Column({
    type: 'varchar',
    length: '767',
    nullable: true,
    default: null,
  })
  public refreshToken?: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}

export class UserId extends PickType(User, ['userId'] as const) {}
