import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from './config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
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
  }), AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
