import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Genero } from '@/genero/dto/Genero';
import { Album } from '@/album/dto/Album';

@Entity()
export class Artista {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  imagen: string;

  @ManyToOne(() => Genero, (genero) => genero.artistas, {
    onDelete: 'SET NULL',
    eager: true,
  })
  genero: Genero;

  @OneToMany(() => Album, (album) => album.artista)
  albums: Album[];
  canciones: any;
}
