import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { DatabaseModule } from 'src/databases/database.module';
import { ProductRepositoryProviders } from './product.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...ProductRepositoryProviders],
  exports: [ProductsService, ...ProductRepositoryProviders],
})
export class ProductsModule {}
