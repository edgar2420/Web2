import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: "http://localhost:5173",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    });

    // Servir archivos estáticos desde la carpeta 'uploads'
    app.useStaticAssets(join(__dirname, "..", "uploads"), {
        prefix: "/uploads",
    });

    await app.listen(3000);
}
bootstrap();
