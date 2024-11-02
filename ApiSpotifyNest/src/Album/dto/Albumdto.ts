import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly imagen: string;

  @IsNumber()
  @IsNotEmpty()
  readonly artistaId: number;
}

export class UpdateAlbumDto {
  @IsString()
  readonly titulo?: string;

  @IsString()
  readonly imagen?: string;
}
