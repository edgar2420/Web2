import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './dto/Genero';
import { CreateGeneroDto, UpdateGeneroDto } from './dto/Generodto';

@Injectable()
export class GeneroService {
  constructor(
    @InjectRepository(Genero)
    private readonly generoRepository: Repository<Genero>,
  ) {}

  async findAll(): Promise<Genero[]> {
    return await this.generoRepository.find();
  }

  async findOne(id: number): Promise<Genero> {
    const genero = await this.generoRepository.findOne({ where: { id } });
    if (!genero) {
      throw new NotFoundException(`Genero with ID ${id} not found`);
    }
    return genero;
  }

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    const newGenero = this.generoRepository.create(createGeneroDto);
    return await this.generoRepository.save(newGenero);
  }

  async update(id: number, updateGeneroDto: UpdateGeneroDto): Promise<Genero> {
    const genero = await this.findOne(id);
    Object.assign(genero, updateGeneroDto);
    return await this.generoRepository.save(genero);
  }

  async remove(id: number): Promise<void> {
    const genero = await this.findOne(id);
    await this.generoRepository.remove(genero);
  }
}
