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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './dto/Albumdto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.albumService.findOne(id);
  }

  @Get('artist/:artistId')
  findByArtist(@Param('artistId') artistId: number) {
    return this.albumService.findByArtist(artistId);
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
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createAlbumDto.imagen = file.filename; // Asocia la imagen cargada
    }
    return await this.albumService.create(createAlbumDto);
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
    @Param('id') id: number,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateAlbumDto.imagen = file.filename; // Actualiza la imagen solo si hay un nuevo archivo
    }
    return await this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.albumService.remove(id);
  }
}
