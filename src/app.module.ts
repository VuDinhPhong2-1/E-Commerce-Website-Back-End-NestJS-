import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { UserModule } from './user/user.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ MongooseModule.forRootAsync({
    imports: [ConfigModule],  // Thêm ConfigModule vào đây
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
      connectionFactory: (connection) => {
        connection.plugin(softDeletePlugin);
        return connection;
      }
    }),
    inject: [ConfigService],
  }),
  ConfigModule.forRoot({ isGlobal: true }),
  UserModule,
  AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
