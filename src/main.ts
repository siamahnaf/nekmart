import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as cookieParser from "cookie-parser";

//App Module
import { AppModule } from "./app.module";

//Initialize Config
const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      credentials: true,
      origin: ["http://localhost:3000", "http://localhost:3002", "https://omvb4gfyktz7dbdexkbqujutaa.srv.us"]
    }
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>("PORT"));
}

bootstrap();