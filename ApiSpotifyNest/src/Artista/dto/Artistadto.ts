import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistaDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly imagen: string;
}

export class UpdateArtistaDto {
  @IsString()
  readonly nombre?: string;

  @IsString()
  readonly imagen?: string;
}
