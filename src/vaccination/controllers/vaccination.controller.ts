import { Controller, Post, Patch, UseGuards, Body, Req, Delete } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { UpdateVaccineDto } from '../dto/vaccine.dto';
import { CreateRecordDto, DeleteRecordDto, UpdateRecordDto } from '../dto/record.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from 'src/auth/guards/user.guard';

@ApiTags('RECORD')
@Controller('record')
export class VaccinationController {
    constructor(
        private readonly vaccinationService: VaccinationService
    ) {

    }


    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Post()
    async createVaccinationRecord(
        @Body() dto: CreateRecordDto,
        @Req() req
    ) {
        return await this.vaccinationService.createVaccinationRecord(req.user.id, dto)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Patch()
    async updateVaccinationRecord(
        @Body() dto: UpdateRecordDto,
        @Req() req
    ) {
        return await this.vaccinationService.updateVaccinationRecord(req.user.id, dto)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @Delete()
    async deleteVaccinationRecord(
        @Body() dto: DeleteRecordDto,
        @Req() req
    ) {
        return await this.vaccinationService.deleteVaccinationRecord(req.user.id, dto)
    }

    // @Post('vaccine')
    // async updateVaccine(
    //     @Body() dto: UpdateVaccineDto
    // ) {
    //     return await this.vaccinationService.updateVaccine(dto)
    // }

}
