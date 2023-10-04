import { Controller, Post, Patch, UseGuards, Body, Req, Delete, Get } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('VACCINE')
@Controller('vaccine')
export class VaccineController {
    constructor(
        private readonly vaccinationService: VaccinationService
    ) {

    }

    @ApiOperation({ summary: 'Lấy danh sách tất cả vaccine trong hệ thống' })
    @Get()
    async baseVaccines() {
        return await this.vaccinationService.baseVaccines()
    }

}
