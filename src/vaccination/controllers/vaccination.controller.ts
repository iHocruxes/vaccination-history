import { Controller, Post, Patch, UseGuards, Body, Req, Delete, Get, Param, Inject } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { UpdateVaccineDto } from '../dto/vaccine.dto';
import { CreateRecordDto, RecordDto, UpdateRecordDto } from '../dto/record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../auth/guards/user.guard';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager'

@ApiTags('RECORD')
@Controller('record')
export class VaccinationController {
    constructor(
        private readonly vaccinationService: VaccinationService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {

    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Danh sách vaccine đã tiêm của khách hàng' })
    @ApiParam({ name: 'medical_record', example: '7PfMRAXlyDreZ5-XuaFDV' })
    @Get(':medical_record')
    async vaccineRecords(
        @Param('medical_record') record_id: string,
        @Req() req
    ): Promise<any> {
        const cache = await this.cacheManager.get('vaccinationHistory-' + record_id)
        if (cache) return cache

        const data = await this.vaccinationService.userRecords(req.user.id, record_id)

        await this.cacheManager.set('vaccinationHistory-' + record_id, data)

        return data
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Khách hàng tạo record vaccination vào hồ sơ bệnh án' })
    @Post()
    async createVaccinationRecord(
        @Body() dto: CreateRecordDto,
        @Req() req
    ) {
        await this.cacheManager.del('vaccinationHistory-' + dto.medical_record)
        return await this.vaccinationService.createVaccinationRecord(req.user.id, dto)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Khách hàng cập nhật record vaccination' })
    @Patch()
    async updateVaccinationRecord(
        @Body() dto: UpdateRecordDto,
        @Req() req
    ) {
        const cache_key = await this.vaccinationService.getMedicalRecordByVaccinationRecord(dto.record_id)
        await this.cacheManager.del('vaccinationHistory-' + cache_key)
        return await this.vaccinationService.updateVaccinationRecord(req.user.id, dto)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Khách hàng xóa record vaccination' })
    @Delete()
    async deleteVaccinationRecord(
        @Body() dto: RecordDto,
        @Req() req
    ) {
        const cache_key = await this.vaccinationService.getMedicalRecordByVaccinationRecord(dto.record_id)
        await this.cacheManager.del('vaccinationHistory-' + cache_key)

        return await this.vaccinationService.deleteVaccinationRecord(req.user.id, dto)
    }

    // @Post('vaccine')
    // async updateVaccine(
    //     @Body() dto: UpdateVaccineDto
    // ) {
    //     return await this.vaccinationService.updateVaccine(dto)
    // }

}
