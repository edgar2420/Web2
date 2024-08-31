import { Foto } from "@/foto/dto/Foto";
import { User } from "@/user/dto/User";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @OneToMany(() => Foto, foto => foto.album)
    fotos: Foto[];

    @ManyToOne(() => User, user => user.albums)
    user: User;
}
