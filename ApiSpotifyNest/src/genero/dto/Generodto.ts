import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGeneroDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  readonly descripcion?: string;
}

export class UpdateGeneroDto {
  @IsString()
  readonly nombre?: string;

  @IsString()
  readonly descripcion?: string;
}
