import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './entities/product.entity';
import { ImageModule } from 'src/image/image.module';
import { CategoryModule } from 'src/category/category.module';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([productEntity,CategoryEntity]),
    ImageModule,
    CategoryModule
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
