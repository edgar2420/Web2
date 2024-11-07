import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateArtistaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  imagen: string;

  @IsNumber()
  @IsNotEmpty()
  readonly generoId: number; // Asocia el artista a un género específico

  @IsString()
  @IsOptional()
  readonly descripcion?: string;
}

export class UpdateArtistaDto {
  @IsString()
  @IsOptional()
  readonly nombre?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsNumber()
  @IsOptional()
  readonly generoId?: number; // Permite actualizar el género asociado
}
