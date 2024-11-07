import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './dto/Album';
import { Artista } from '@/Artista/dto/Artista';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Albumdto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artista)
    private readonly artistaRepository: Repository<Artista>,
  ) {}

  async findAll() {
    return await this.albumRepository.find({ relations: ['artista'] });
  }

  async findOne(id: number) {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['artista'],
    });

    if (!album) {
      throw new HttpException('Álbum no encontrado', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async findByArtist(artistId: number) {
    const albums = await this.albumRepository.find({
      where: { artista: { id: artistId } },
      relations: ['artista'],
    });

    if (!albums) {
      throw new HttpException(
        'No albums found for this artist',
        HttpStatus.NOT_FOUND,
      );
    }

    return albums;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const { artistId, ...albumData } = createAlbumDto;
    const artista = await this.artistaRepository.findOne({
      where: { id: artistId },
    });

    if (!artista) {
      throw new HttpException('Artista no encontrado', HttpStatus.NOT_FOUND);
    }

    const newAlbum = this.albumRepository.create({ ...albumData, artista });
    return await this.albumRepository.save(newAlbum);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({ where: { id } });

    if (!album) {
      throw new HttpException('Álbum no encontrado', HttpStatus.NOT_FOUND);
    }

    console.log('Datos para actualizar:', updateAlbumDto);

    if (updateAlbumDto.titulo) album.titulo = updateAlbumDto.titulo;
    if (updateAlbumDto.descripcion)
      album.descripcion = updateAlbumDto.descripcion;
    if (updateAlbumDto.imagen) album.imagen = updateAlbumDto.imagen;

    const updatedAlbum = await this.albumRepository.save(album);

    console.log('Album después de la actualización:', updatedAlbum);

    return updatedAlbum;
  }

  async remove(id: number) {
    const album = await this.albumRepository.findOne({
      where: { id },
    });

    if (!album) {
      throw new HttpException('Álbum no encontrado', HttpStatus.NOT_FOUND);
    }

    return await this.albumRepository.remove(album);
  }
}
