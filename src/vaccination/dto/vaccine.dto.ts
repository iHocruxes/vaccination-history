import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class UpdateVaccineDto {
    @IsNotEmpty()
    @IsString()
    disease: string

    @IsNotEmpty()
    @Min(1)
    @IsNumber()
    max_dose: number

    @IsNotEmpty()
    @IsBoolean()
    is_child: boolean
}