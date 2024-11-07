import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Artista } from '@/artista/dto/Artista';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => Artista, (artista) => artista.genero)
  artistas: Artista[];
}
