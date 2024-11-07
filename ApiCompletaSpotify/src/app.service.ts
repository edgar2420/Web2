import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Genero } from './genero/dto/Genero';
import { Artista } from './artista/dto/Artista';
import { Album } from './album/dto/Album';
import { Cancion } from './cancion/dto/Cancion';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
  ) {}

  async search(query: string) {
    const likeQuery = `%${query}%`; // Patrón para búsqueda parcial
    const [generos, artistas, albums, canciones] = await Promise.all([
      this.generoRepository.find({
        where: { nombre: Like(likeQuery) },
      }),
      this.artistaRepository.find({
        where: { nombre: Like(likeQuery) },
      }),
      this.albumRepository.find({
        where: { titulo: Like(likeQuery) },
      }),
      this.cancionRepository.find({
        where: { titulo: Like(likeQuery) },
      }),
    ]);
    return {
      generos,
      artistas,
      albums,
      canciones,
    };
  }
}
