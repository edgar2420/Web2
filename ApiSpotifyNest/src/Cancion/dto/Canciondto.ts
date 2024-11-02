import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCancionDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly archivo: string;

  @IsNumber()
  @IsNotEmpty()
  readonly albumId: number;
}

export class UpdateCancionDto {
  @IsString()
  readonly titulo?: string;

  @IsString()
  readonly archivo?: string;

  @IsNumber()
  readonly albumId?: number;
}
