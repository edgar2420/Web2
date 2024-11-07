import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artista } from './dto/Artista';
import { Genero } from '@/genero/dto/Genero'; // Importar el modelo de género
import { CreateArtistaDto, UpdateArtistaDto } from './dto/Artistadto';
import { Cancion } from '@/cancion/dto/Cancion';

@Injectable()
export class ArtistaService {
  constructor(
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
  ) {}

  async findAll(): Promise<Artista[]> {
    return await this.artistaRepository.find({ relations: ['genero'] });
  }

  async findOne(id: number): Promise<Artista> {
    const artista = await this.artistaRepository.findOne({
      where: { id },
      relations: ['genero'],
    });
    if (!artista) {
      throw new NotFoundException(`Artista with ID ${id} not found`);
    }
    return artista;
  }

  // Nuevo método para obtener artistas por género
  async findByGenero(generoId: number): Promise<Artista[]> {
    return await this.artistaRepository.find({
      where: { genero: { id: generoId } },
      relations: ['genero'],
    });
  }

  async getSongsByArtist(artistId: number): Promise<Cancion[]> {
    return this.cancionRepository.find({
      where: { artista: { id: artistId } },
      relations: ['album'],
    });
  }

  async create(createArtistaDto: CreateArtistaDto): Promise<Artista> {
    const { generoId, ...rest } = createArtistaDto;

    const genero = await this.generoRepository.findOne({
      where: { id: generoId },
    });

    if (!genero) {
      throw new NotFoundException(`Genre with ID ${generoId} not found`);
    }

    const newArtista = this.artistaRepository.create({
      ...rest,
      genero,
    });

    return await this.artistaRepository.save(newArtista);
  }

  async update(
    id: number,
    updateArtistaDto: UpdateArtistaDto,
  ): Promise<Artista> {
    const artista = await this.findOne(id);

    if (updateArtistaDto.generoId) {
      const genero = await this.generoRepository.findOne({
        where: { id: updateArtistaDto.generoId },
      });

      if (!genero) {
        throw new NotFoundException(
          `Genre with ID ${updateArtistaDto.generoId} not found`,
        );
      }

      artista.genero = genero;
    }

    Object.assign(artista, updateArtistaDto);
    return await this.artistaRepository.save(artista);
  }

  async remove(id: number): Promise<void> {
    const artista = await this.findOne(id);
    await this.artistaRepository.remove(artista);
  }
}
