import { Album } from "@/album/dto/Album";
import { User } from "@/user/dto/User";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
export class Foto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @ManyToOne(() => Album, album => album.fotos, { onDelete: "CASCADE" })
    album: Album;
    fotoXAlbums: any;

    @ManyToOne(() => User, user => user.fotos)
    user: User;
}
