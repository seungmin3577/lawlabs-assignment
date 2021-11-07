import { Type } from 'class-transformer';
import { IsNumber, IsString, IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
    length: '767',
  })
  public password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
