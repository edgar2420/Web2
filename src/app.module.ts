import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AlbumController } from "./album/album.controller";
import { AlbumService } from "./album/album.service";
import { FotoController } from "./foto/foto.controller";
import { FotoService } from "./foto/foto.service";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Album } from "./album/dto/Album";
import { Foto } from "./foto/dto/Foto";
import { User } from "./user/dto/User";
import { MulterModule } from "@nestjs/platform-express";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";


@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "practico4",
            entities: [Album, Foto, User],
            synchronize: true,
            logging: true,
        }),
        TypeOrmModule.forFeature([Album, Foto, User]),
        MulterModule.register({
            dest: "./uploads",
        }),
    ],
    controllers: [AppController, AlbumController, FotoController, UserController],
    providers: [AppService, AlbumService, FotoService, UserService],
})
export class AppModule {}
