import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;
}
