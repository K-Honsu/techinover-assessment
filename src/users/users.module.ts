import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { preSave } from './schemas/middleware';
import { userMethods } from './schemas/methods';
import { UsersController } from './users.controller';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          // Register middleware
          schema.pre('save', preSave);

          // Register all methods
          for (const method of userMethods) {
            schema.method(method.name, method);
          }

          return schema;
        },
      },
    ]),
    CacheModule.register()
  ],
  controllers: [UsersController],
  exports: [UsersService, MongooseModule],
  providers: [UsersService],
})
export class UsersModule { }
