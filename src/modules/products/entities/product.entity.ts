import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UserGrade } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * 요구 사항
 *
 * 회원의 등급 별로 다른 상품이 보여져야 함.
 * @등급표
 * 1. 중요회원
 * 2. 일반회원
 */

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @Type(() => Number)
  readonly productId: number;

  @IsString()
  @Column({
    type: 'varchar',
    length: '767',
    unique: true,
  })
  public productName: string;

  @IsNumber()
  @Type(() => Number)
  @Column({
    type: 'int',
  })
  public productPrice: number;

  @IsNumber()
  @Type(() => Number)
  @Column({
    type: 'int',
  })
  public productStock: number;

  @IsEnum(UserGrade)
  @Column({
    type: 'enum',
    enum: UserGrade,
  })
  public allowGrade: UserGrade;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
