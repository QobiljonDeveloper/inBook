import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
async function start() {
  try {
    const PORT = process.env.PORT ?? 3030;
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    const config = new DocumentBuilder()
      .setTitle("InBook Project")
      .setDescription("InBook REST API")
      .setVersion("1.0")
      .addTag("AccessToken, RefreshToken, Cookie, BOT, SMS, SendMail,Guards")
      .addBearerAuth()
      .build();
    app.use(cookieParser());
    const document = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    await app.listen(PORT, () => {
      console.log(`Server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
