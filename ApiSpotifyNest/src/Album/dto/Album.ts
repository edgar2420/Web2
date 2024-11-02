import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Cancion } from '@/cancion/dto/Cancion';
import { Artista } from '@/artista/dto/Artista';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  imagen: string;

  @OneToMany(() => Cancion, (cancion) => cancion.album)
  canciones: Cancion[];

  @ManyToOne(() => Artista, (artista) => artista.albums)
  artista: Artista;
}
