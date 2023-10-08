import { Controller, Post, Patch, UseGuards, Body, Req, Delete, Get, Param } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { UpdateVaccineDto } from '../dto/vaccine.dto';
import { CreateRecordDto, RecordDto, UpdateRecordDto } from '../dto/record.dto';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '../../auth/guards/user.guard';

@ApiTags('RECORD')
@Controller('record')
export class VaccinationController {
    constructor(
        private readonly vaccinationService: VaccinationService
    ) {

    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Danh sách vaccine đã tiêm của khách hàng' })
    @ApiParam({ name: 'medical_record', example: '7PfMRAXlyDreZ5-XuaFDV' })
    @Get()
    async vaccineRecords(
        @Param('medical_record') record_id: string,
        @Req() req
    ): Promise<any> {
        return await this.vaccinationService.userRecords(req.user.id, record_id)
    }

    @UseGuards(UserGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Khách hàng tạo record vaccination vào hồ sơ bệnh án' })
    @Post()
    async createVaccinationRecord(
        @Body() dto: CreateRecordDto,
        @Req() req
    ) {
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
        return await this.vaccinationService.deleteVaccinationRecord(req.user.id, dto)
    }

    // @Post('vaccine')
    // async updateVaccine(
    //     @Body() dto: UpdateVaccineDto
    // ) {
    //     return await this.vaccinationService.updateVaccine(dto)
    // }

}
