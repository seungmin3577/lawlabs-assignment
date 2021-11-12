import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { RolesGuard } from 'src/common/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { User, UserRole } from '../users/entities/user.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import {
  FindProductReqDto,
  FindProductResDto,
} from './dtos/select-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { Product, ProductId } from './entities/product.entity';
import { ProductsService } from './products.service';

@UseGuards(RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findProductList(
    @Req() request: Request,
    @Query() { productName }: FindProductReqDto,
  ): Promise<FindProductResDto[]> {
    const { grade, role } = request.user;

    const products = await this.productsService.findProductList({
      productName,
      userRole: role,
      userGrade: grade,
    });

    return products.map((product) => this.productDataMapper(product));
  }

  @Roles(UserRole.관리자)
  @Get(':productId')
  async findProduct(@Param() productId: ProductId): Promise<FindProductResDto> {
    const product = await this.productsService.findProductById({
      ...productId,
    });
    if (!product) throw new BadRequestException();

    return this.productDataMapper(product);
  }

  @Roles(UserRole.관리자)
  @Post()
  @HttpCode(201)
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productsService.createProduct(createProductDto);
  }

  @Roles(UserRole.관리자)
  @Patch('productId')
  async updateProduct(
    @Param() productId: ProductId,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.updateProduct({
      ...productId,
      ...updateProductDto,
    });
  }

  @Roles(UserRole.관리자)
  @Delete(':productId')
  @HttpCode(204)
  async deleteProduct(@Param() productId: ProductId): Promise<void> {
    await this.productsService.deleteProduct({ ...productId });
    return;
  }

  private productDataMapper = ({
    productId,
    productName,
    productStock,
    productPrice,
    discountRate = null,
    createdAt,
    updatedAt,
  }: Product): FindProductResDto => ({
    productId,
    productName,
    productStock,
    productPrice,
    discountRate,
    createdAt,
    updatedAt,
  });
}
