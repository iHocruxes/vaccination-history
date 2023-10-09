import { Controller, Post, Patch, UseGuards, Body, Req, Delete, Get, Inject } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@ApiTags('VACCINE')
@Controller('vaccine')
export class VaccineController {
    constructor(
        private readonly vaccinationService: VaccinationService,
        @Inject(CACHE_MANAGER) private cacheManger: Cache
    ) {

    }

    @ApiOperation({ summary: 'Lấy danh sách tất cả vaccine trong hệ thống' })
    @ApiResponse({ status: 200, description: 'Thành công' })
    @Get()
    async baseVaccines() {

        const cache = await this.cacheManger.get('vaccines')
        if (cache) return cache

        const data = await this.vaccinationService.baseVaccines()
        await this.cacheManger.set('vaccines', data, 0)

        return data
    }

}
