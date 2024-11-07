import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCancionDto {
  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  archivo: string;

  @IsNumber()
  @IsNotEmpty()
  albumId: number;
}

export class UpdateCancionDto {
  @IsOptional()
  @IsString()
  readonly titulo?: string;

  @IsOptional()
  @IsString()
  archivo?: string;

  @IsOptional()
  @IsNumber()
  albumId?: number;
}
