import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productEntity } from './product/entities/product.entity';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { CategoryEntity } from './category/entities/category.entity';
import { ImageEntity } from './image/image.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigAsync } from './config/mysql.config';
import { dataSourceOptions } from './config/orm.config';

@Module({
  imports: [

    TypeOrmModule.forRoot(dataSourceOptions),
    // TypeOrmModule.forRoot(),
    ProductModule,
    ImageModule,
    CategoryModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath:['.env'],
      cache:true,
      expandVariables:true,
      isGlobal:true,
      
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
