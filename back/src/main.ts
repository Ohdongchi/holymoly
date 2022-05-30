import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { SocketAdapter } from "./adapter/socket_io.adapter";
import { AppModule } from "./app.module";
import { setupSwagger } from "./util/swagger";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors:true});
  // app.enableCors();
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.useWebSocketAdapter(new SocketAdapter(app));
  setupSwagger(app);
  await app.listen(3002, () => {
    console.log("서버가 3002포트로 열렸습니다.");
  });
}
bootstrap();
