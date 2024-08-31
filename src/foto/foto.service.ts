import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Foto } from "./dto/Foto";
import { CreateFotoDto, UpdateFotoDto } from "./dto/Fotodto";
import { Album } from "@/album/dto/Album";
import { User } from "@/user/dto/User";

@Injectable()
export class FotoService {
    constructor(
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createFotoDto: CreateFotoDto, file: Express.Multer.File): Promise<Foto> {
        const album = await this.albumRepository.findOne({ where: { id: createFotoDto.albumId }, relations: ["user"] });
        if (!album) {
            throw new HttpException("Álbum no encontrado", HttpStatus.NOT_FOUND);
        }
        const user = await this.userRepository.findOne({ where: { id: createFotoDto.userId } });
        if (!user) {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        const foto = this.fotoRepository.create({ url: file.filename, album, user });
        return await this.fotoRepository.save(foto);
    }

    async update(id: number, updateFotoDto: UpdateFotoDto, file?: Express.Multer.File): Promise<Foto> {
        const foto = await this.fotoRepository.findOne({ where: { id }, relations: ["album", "user"] });
        if (!foto) {
            throw new HttpException("Foto no encontrada", HttpStatus.NOT_FOUND);
        }

        if (updateFotoDto.albumId) {
            const album = await this.albumRepository.findOne({ where: { id: updateFotoDto.albumId } });
            if (!album) {
                throw new HttpException("Album no encontrado", HttpStatus.NOT_FOUND);
            }
            foto.album = album;
        }

        if (updateFotoDto.userId) {
            const user = await this.userRepository.findOne({ where: { id: updateFotoDto.userId } });
            if (!user) {
                throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }
            foto.user = user;
        }

        if (file) {
            foto.url = file.filename;
        }

        this.fotoRepository.merge(foto, updateFotoDto);
        return await this.fotoRepository.save(foto);
    }

    async findAll(): Promise<Foto[]> {
        return await this.fotoRepository.find({ relations: ["album", "user"] });
    }

    async findByUser(userId: number): Promise<Foto[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        return await this.fotoRepository.find({ where: { user }, relations: ["album", "user"] });
    }

    async findOne(id: number): Promise<Foto> {
        return await this.fotoRepository.findOne({ where: { id }, relations: ["album", "user"] });
    }

    async remove(id: number): Promise<void> {
        const foto = await this.fotoRepository.findOne({ where: { id }, relations: ["album", "user"] });
        if (!foto) {
            throw new HttpException("Foto no encontrada", HttpStatus.NOT_FOUND);
        }
        await this.fotoRepository.remove(foto);
    }
}
