import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateFotoDto {
    @IsString()
    @IsNotEmpty()
    readonly url: string;

    @IsNumber()
    @IsNotEmpty()
    readonly albumId: number;

    @IsNumber()
    @IsNotEmpty()
    readonly userId: number;
}

export class UpdateFotoDto {
    @IsString()
    readonly url?: string;

    @IsNumber()
    readonly albumId?: number;

    @IsNumber()
    readonly userId?: number;
}
