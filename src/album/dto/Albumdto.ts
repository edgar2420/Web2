import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsNotEmpty()
    readonly userId: number;
}
export class UpdateAlbumDto {
    @IsString()
    readonly nombre?: string;

    @IsString()
    readonly descripcion?: string;
}
