import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors, HttpException, HttpStatus } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FotoService } from "./foto.service";
import { CreateFotoDto, UpdateFotoDto } from "./dto/Fotodto";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller("fotos")
export class FotoController {
    constructor(private readonly fotoService: FotoService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    async create(@Body() createFotoDto: CreateFotoDto, @UploadedFile() file: Express.Multer.File) {
        return this.fotoService.create(createFotoDto, file);
    }

    @Put(":id")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: "./uploads",
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    async update(@Param("id") id: number, @Body() updateFotoDto: UpdateFotoDto, @UploadedFile() file: Express.Multer.File) {
        return this.fotoService.update(id, updateFotoDto, file);
    }

    @Delete(":id")
    async remove(@Param("id") id: number) {
        return this.fotoService.remove(id);
    }

    @Get("user/:userId")
    async findByUser(@Param("userId") userId: number) {
        try {
            return await this.fotoService.findByUser(userId);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    async findAll() {
        return this.fotoService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: number) {
        return this.fotoService.findOne(id);
    }
}
