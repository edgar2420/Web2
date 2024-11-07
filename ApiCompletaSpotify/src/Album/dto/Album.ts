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

  @Column({ nullable: true })
  descripcion: string;

  @Column()
  imagen: string;

  @OneToMany(() => Cancion, (cancion) => cancion.album, { cascade: true })
  canciones: Cancion[];

  @ManyToOne(() => Artista, (artista) => artista.albums, {
    onDelete: 'CASCADE',
  })
  artista: Artista;
}
