import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Album } from "./dto/Album";
import { CreateAlbumDto, UpdateAlbumDto } from "./dto/Albumdto";
import { User } from "src/user/dto/User";
import { Foto } from "@/foto/dto/Foto";

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(Album)
        private readonly albumRepository: Repository<Album>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Foto)
        private readonly fotoRepository: Repository<Foto>,
    ) {}

    async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
        const user = await this.userRepository.findOne({ where: { id: createAlbumDto.userId } });
        if (!user) {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        const album = this.albumRepository.create({ ...createAlbumDto, user });
        return await this.albumRepository.save(album);
    }

    async findAll(): Promise<Album[]> {
        return await this.albumRepository.find({ relations: ["user", "fotos"] });
    }

    async findOne(id: number): Promise<Album> {
        return await this.albumRepository.findOne({ where: { id }, relations: ["user", "fotos"] });
    }

    async findByUser(userId: number): Promise<Album[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException("Usuario no encontrado", HttpStatus.NOT_FOUND);
        }
        return await this.albumRepository.find({ where: { user }, relations: ["user", "fotos"] });
    }

    async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
        const album = await this.albumRepository.findOne({ where: { id }, relations: ["user"] });
        if (!album) {
            throw new HttpException("Album no encontrado", HttpStatus.NOT_FOUND);
        }
        this.albumRepository.merge(album, updateAlbumDto);
        return await this.albumRepository.save(album);
    }

    async remove(id: number): Promise<void> {
        const album = await this.albumRepository.findOne({ where: { id }, relations: ["fotos"] });
        if (!album) {
            throw new HttpException("Album no encontrado", HttpStatus.NOT_FOUND);
        }

        await this.fotoRepository.remove(album.fotos);
        await this.albumRepository.remove(album);
    }
}
