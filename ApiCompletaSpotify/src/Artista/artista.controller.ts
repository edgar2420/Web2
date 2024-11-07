import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ArtistaService } from './artista.service';
import { CreateArtistaDto, UpdateArtistaDto } from './dto/Artistadto';

@Controller('artista')
export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) {}

  @Get()
  async findAll() {
    try {
      return await this.artistaService.findAll();
    } catch (error) {
      throw new HttpException(
        'Error fetching artists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':artistId/songs')
  async getSongsByArtist(@Param('artistId') artistId: number) {
    return this.artistaService.getSongsByArtist(artistId);
  }

  // Nuevo endpoint para obtener artistas por género
  @Get('genero/:generoId')
  async findByGenero(@Param('generoId') generoId: string) {
    try {
      return await this.artistaService.findByGenero(parseInt(generoId, 10));
    } catch (error) {
      throw new HttpException(
        'Error fetching artists by genre',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const artist = await this.artistaService.findOne(+id);
      if (!artist) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      return artist;
    } catch (error) {
      throw new HttpException(
        'Error fetching artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.split('.')[0];
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${originalName}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async create(
    @Body() createArtistaDto: CreateArtistaDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (!file) {
        throw new HttpException(
          'Image file is required',
          HttpStatus.BAD_REQUEST,
        );
      }
      createArtistaDto.imagen = file.filename;
      return await this.artistaService.create(createArtistaDto);
    } catch (error) {
      throw new HttpException(
        'Error creating artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const originalName = file.originalname.split('.')[0];
          const fileExtName = file.originalname.split('.').pop();
          cb(null, `${originalName}-${uniqueSuffix}.${fileExtName}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateArtistaDto: UpdateArtistaDto,
    @UploadedFile() file: Express.Multer.File, // Este campo maneja la imagen
  ) {
    if (file) {
      updateArtistaDto.imagen = file.filename; // Asociamos la nueva imagen si se sube una
    }

    try {
      const updatedArtist = await this.artistaService.update(
        +id,
        updateArtistaDto,
      );
      return updatedArtist;
    } catch (error) {
      throw new HttpException(
        'Error updating artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      throw new HttpException('Invalid ID format', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.artistaService.remove(parsedId);
      return { message: 'Artist deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Error deleting artist',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
