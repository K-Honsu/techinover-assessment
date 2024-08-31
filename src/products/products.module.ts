import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([{
      name: Product.name,
      useFactory: () => {
        const schema = ProductSchema
        return schema
      }

    }]),
    UsersModule,
    CacheModule.register()
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
