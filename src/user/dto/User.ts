import { Album } from "@/album/dto/Album";
import { Foto } from "@/foto/dto/Foto";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Album, album => album.user)
    albums: Album[];

    @OneToMany(() => Foto, foto => foto.user)
    fotos: Foto[];
}
