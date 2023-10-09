import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateRecordDto {
    @IsNotEmpty()
    @ApiProperty({ example: '7PfMRAXlyDreZ5-XuaFDV' })
    @IsString()
    medical_record: string

    @IsNotEmpty()
    @ApiProperty({ example: '7WmGChYi9o_wr1f2q3kI6' })
    @IsString()
    vaccine_id: string

    @IsNotEmpty()
    @Min(0)
    @IsNumber()
    @ApiProperty({ example: 1 })
    dose_number: number

    @IsNotEmpty()
    @ApiProperty({ example: '08/05/2023' })
    date: string
}

export class UpdateRecordDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'gYN-0oDs-EGaEwuGLRMgL' })
    record_id: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '3' })
    dose_number: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '08/10/2023' })
    date: string
}

export class RecordDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'gYN-0oDs-EGaEwuGLRMgL' })
    record_id: string
}