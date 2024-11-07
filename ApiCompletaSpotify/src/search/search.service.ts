/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Album } from '../album/dto/Album';
import { Artista } from '../artista/dto/Artista';
import { Cancion } from '../cancion/dto/Cancion';
import { Genero } from '../genero/dto/Genero';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async search(query: string) {
    if (!query || query.trim() === '') {
      return { albums: [], artistas: [], canciones: [], generos: [] };
    }
    
    console.log("Query en el servicio de búsqueda:", query);
  
    const albums = await this.albumRepository.find({
      where: { titulo: Like(`%${query}%`) },
    });
    const artistas = await this.artistaRepository.find({
      where: { nombre: Like(`%${query}%`) },
    });
    const canciones = await this.cancionRepository.find({
      where: { titulo: Like(`%${query}%`) },
    });
    const generos = await this.generoRepository.find({
      where: { nombre: Like(`%${query}%`) },
    });
  
    return { albums, artistas, canciones, generos };
  }
}