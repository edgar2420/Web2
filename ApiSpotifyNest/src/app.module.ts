import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { ArtistaController } from './artista/artista.controller';
import { ArtistaService } from './artista/artista.service';
import { CancionController } from './cancion/cancion.controller';
import { CancionService } from './cancion/cancion.service';
import { GeneroController } from './genero/genero.controller';
import { GeneroService } from './genero/genero.service';

import { Album } from './album/dto/Album';
import { Artista } from './artista/dto/Artista';
import { Cancion } from './cancion/dto/Cancion';
import { Genero } from './genero/dto/Genero';

@Module({
  imports: [
    // Configuración de TypeORM para conectarse a la base de datos MySQL
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'apispotify',
      entities: [Album, Artista, Cancion, Genero],
      synchronize: true,
      logging: true,
    }),

    // Registro de entidades para que estén disponibles en los servicios
    TypeOrmModule.forFeature([Album, Artista, Cancion, Genero]),

    // Configuración de Multer para manejar la subida de archivos
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    AppController,
    GeneroController,
    AlbumController,
    CancionController,
    ArtistaController,
  ],
  providers: [
    AppService,
    GeneroService,
    AlbumService,
    CancionService,
    ArtistaService,
  ],
})
export class AppModule {}
