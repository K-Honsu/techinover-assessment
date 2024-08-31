import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10
  }]), ConfigModule.forRoot({
    load: [configuration],
    isGlobal: true
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      return {
        uri: configService.get<string>('db.uri'),
      };
    },
  }), AuthModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
