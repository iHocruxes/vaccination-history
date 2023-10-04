import { Controller, Post, Patch, UseGuards, Body, Req, Delete } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { UpdateVaccineDto } from '../dto/vaccine.dto';
import { CreateRecordDto, DeleteRecordDto, UpdateRecordDto } from '../dto/record.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
