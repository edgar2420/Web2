import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Album } from '@/album/dto/Album';

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
}
