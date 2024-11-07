import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancion } from './dto/Cancion';
import { Album } from '../album/dto/Album';
import { Artista } from '../artista/dto/Artista';
import { CreateCancionDto, UpdateCancionDto } from './dto/Canciondto';

@Injectable()
export class CancionService {
  constructor(
    @InjectRepository(Cancion)
    private readonly cancionRepository: Repository<Cancion>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}

  // Obtener todas las canciones (sin filtro de álbum)
  findAll() {
    return this.cancionRepository.find({
      relations: ['album', 'artista'],
    });
  }
  // Obtener todas las canciones de un álbum específico
  findAllByAlbum(albumId: number) {
    return this.cancionRepository.find({
      where: { album: { id: albumId } },
      relations: ['album', 'artista'],
    });
  }

  findOne(id: number) {
    return this.cancionRepository.findOne({
      where: { id },
      relations: ['album', 'artista'],
    });
  }

  // Crear una nueva canción para un álbum específico
  async create(createCancionDto: CreateCancionDto) {
    const { albumId, titulo, archivo } = createCancionDto;

    // Verificar si el álbum existe y obtener el artista asociado
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['artista'],
    });

    if (!album) {
      throw new NotFoundException(`Álbum con ID ${albumId} no encontrado`);
    }

    // Crear la canción y asociarla con el álbum y el artista del álbum
    const newCancion = this.cancionRepository.create({
      titulo,
      archivo,
      album,
      artista: album.artista,
    });

    return await this.cancionRepository.save(newCancion);
  }

  async update(id: number, updateCancionDto: UpdateCancionDto) {
    const existingSong = await this.cancionRepository.findOne({
      where: { id },
    });
    if (!existingSong) {
      throw new NotFoundException(`La canción con ID ${id} no existe.`);
    }

    // Solo actualizar los campos proporcionados
    if (updateCancionDto.titulo) existingSong.titulo = updateCancionDto.titulo;
    if (updateCancionDto.archivo)
      existingSong.archivo = updateCancionDto.archivo;

    return this.cancionRepository.save(existingSong);
  }

  async remove(id: number) {
    const cancion = await this.findOne(id);
    if (!cancion) {
      throw new NotFoundException(`Canción con ID ${id} no encontrada`);
    }
    await this.cancionRepository.remove(cancion);
    return { deleted: true };
  }
}
