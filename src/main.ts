import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
async function bootstrap() {

  //Định nghĩa rằng đang tạo một ứng dụng NestJS cho môi trường Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule,);

  //Cấu hình pipe
  app.useGlobalPipes(new ValidationPipe());

  // Cấu hình tiền tố,version cho url
  app.setGlobalPrefix('api') // Tiền tố sẽ là "api"
  app.enableVersioning({
    type: VersioningType.URI, // mặc định của VersioningType.URI là '/v'
    defaultVersion: ['1', '2'], // => v1,v2
  });

  // config Reflector 
  const reflector = app.get(Reflector);

  // setup AuthGuard global
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  //Cấu hình port
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  await app.listen(port);
  console.log("App is listening on: ", port);
}
bootstrap();
