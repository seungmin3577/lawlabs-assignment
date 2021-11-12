import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { INTERNAL_SERVER_ERROR_MESSAGE } from 'src/constants/exception-messages';
import { UserGrade, UserRole } from '../users/entities/user.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { FindProductReqDto } from './dtos/select-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductId } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async findProductList(
    findDto: FindProductReqDto & { userRole: UserRole; userGrade: UserGrade },
  ): Promise<Product[]> {
    return await this.productRepository.findAll(findDto);
  }

  findProductById({ productId }: ProductId): Promise<Product | undefined> {
    return this.productRepository.findOne({ productId });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const entity = await this.productRepository.create(createProductDto);

    return this.productRepository.save(entity);
  }

  async updateProduct({
    productId,
    allowGrade,
    productName,
    productPrice,
    productStock,
  }: ProductId & UpdateProductDto) {
    const product = await this.productRepository.findOne({ productId });

    if (!product) new BadRequestException();

    if (allowGrade) product.allowGrade = allowGrade;
    if (productName) product.productName = productName;
    if (productPrice) product.productPrice = productPrice;
    if (productStock) product.productStock = productStock;

    return await this.productRepository.save(product);
  }

  async deleteProduct({ productId }: ProductId) {
    return this.productRepository.softRemove({ productId });
  }
}
