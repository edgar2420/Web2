import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsString()
  @IsNotEmpty()
  imagen?: string;

  @IsNumber()
  @IsNotEmpty()
  readonly artistId: number; // ID del artista al que pertenece el álbum
}

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  readonly titulo?: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsNumber()
  @IsOptional()
  readonly artistId?: number; // ID del artista al que pertenece el álbum
}
