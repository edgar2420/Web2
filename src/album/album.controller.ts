import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from "@nestjs/common";
import { AlbumService } from "./album.service";
import { CreateAlbumDto, UpdateAlbumDto } from "./dto/Albumdto";

@Controller("albums")
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Post()
    async create(@Body() createAlbumDto: CreateAlbumDto) {
        try {
            return await this.albumService.create(createAlbumDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        return this.albumService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number) {
        const album = await this.albumService.findOne(id);
        if (!album) {
            throw new HttpException("Album no encontrado", HttpStatus.NOT_FOUND);
        }
        return album;
    }

    @Get("user/:userId")
    async findByUser(@Param("userId") userId: number) {
        try {
            return await this.albumService.findByUser(userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() updateAlbumDto: UpdateAlbumDto) {
        try {
            return await this.albumService.update(id, updateAlbumDto);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(":id")
    async remove(@Param("id") id: number) {
        try {
            return await this.albumService.remove(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
