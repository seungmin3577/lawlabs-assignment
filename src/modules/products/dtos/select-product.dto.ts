import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { Product } from '../entities/product.entity';

export class FindProductReqDto extends PartialType(
  PickType(Product, ['productName'] as const),
) {}

export class FindProductResDto extends IntersectionType(
  PickType(Product, [
    'productId',
    'productName',
    'productPrice',
    'productStock',
    'createdAt',
    'updatedAt',
  ] as const),
  PartialType(PickType(Product, ['discountRate'])),
) {}
