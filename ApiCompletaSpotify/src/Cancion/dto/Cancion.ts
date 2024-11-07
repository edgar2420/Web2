import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '@/album/dto/Album';
import { Artista } from '@/artista/dto/Artista';

@Entity()
export class Cancion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  archivo: string;

  @ManyToOne(() => Album, (album) => album.canciones, { onDelete: 'CASCADE' })
  album: Album;

  @ManyToOne(() => Artista, (artista) => artista.canciones, {
    onDelete: 'CASCADE',
  })
  artista: Artista;
}
