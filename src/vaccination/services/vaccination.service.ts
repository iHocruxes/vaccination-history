import { Injectable, UnauthorizedException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../config/base.service';
import { VaccinationRecords } from '../entities/record.entity';
import { Repository } from 'typeorm';
import { Vaccines } from '../entities/vaccine.entity';
import { UpdateVaccineDto } from '../dto/vaccine.dto';
import { CreateRecordDto, RecordDto, UpdateRecordDto } from '../dto/record.dto';
import { MedicalRecord } from '../entities/medical-record.entity';

@Injectable()
export class VaccinationService extends BaseService<VaccinationRecords> {
    constructor(
        @InjectRepository(VaccinationRecords) private readonly vaccinationRecordRepository: Repository<VaccinationRecords>,
        @InjectRepository(Vaccines) private readonly vaccineRepository: Repository<Vaccines>,
        @InjectRepository(MedicalRecord) private readonly medicalRecordRepository: Repository<MedicalRecord>
    ) {
        super(vaccinationRecordRepository)
    }

    async updateVaccine(dto: UpdateVaccineDto): Promise<any> {
        const vaccine = new Vaccines()

        vaccine.disease = dto.disease
        vaccine.max_dose = dto.max_dose
        vaccine.is_child = dto.is_child

        const data = await this.vaccineRepository.save(vaccine)
        return {
            data: data
        }
    }

    async getVaccines(): Promise<any> {
        return {
            data: await this.vaccineRepository.find({
                select: ['id', 'disease', 'max_dose', 'is_child']
            })
        }
    }

    async createVaccinationRecord(user_id: string, dto: CreateRecordDto): Promise<any> {
        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: { id: dto.medical_record },
            select: ['id', 'manager_id']
        })

        if (user_id != medicalRecord.manager_id)
            throw new UnauthorizedException('unauthorized')

        const vaccine = await this.vaccineRepository.findOne({
            where: { id: dto.vaccine_id }
        })

        if (!vaccine)
            throw new NotFoundException('vaccine_not_found')

        const injectedVaccine = await this.vaccinationRecordRepository.findOne({
            where: { vaccine: vaccine }
        })

        if (injectedVaccine)
            throw new ConflictException('vaccine_conflict')

        if (dto.dose_number > vaccine.max_dose)
            throw new BadRequestException('dose_number_must_be_less_or_equal_than_max_dose')

        const vaccinationRecord = new VaccinationRecords()
        vaccinationRecord.medical_record = medicalRecord
        vaccinationRecord.vaccine = vaccine
        vaccinationRecord.dose_number = dto.dose_number
        vaccinationRecord.date = dto.date
        vaccinationRecord.updated_at = this.VNTime()

        const data = await this.vaccinationRecordRepository.save(vaccinationRecord)

        return {
            data: data
        }
    }

    async updateVaccinationRecord(user_id: string, dto: UpdateRecordDto): Promise<any> {
        const record = await this.vaccinationRecordRepository.findOne({
            where: { id: dto.record_id },
            relations: ['medical_record'],
        })

        if (!record)
            throw new NotFoundException('record_not_found')

        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: { id: record.medical_record.id },
            select: ['manager_id'],
        })

        if (user_id != medicalRecord.manager_id)
            throw new UnauthorizedException('unauthorized')

        const vaccine = await this.vaccineRepository.findOne({
            where: { id: record.vaccine.id },
            select: ['max_dose']
        })

        if (dto.dose_number > vaccine.max_dose)
            throw new BadRequestException('dose_number_must_be_less_or_equal_than_max_dose')


        record.dose_number = dto.dose_number
        record.date = dto.date
        const data = await this.vaccinationRecordRepository.save(record)

        return {
            data: {
                id: data.id,
                dose_number: data.dose_number,
                date: data.date,
                updated_at: data.updated_at,
                medical_record: {
                    id: data.medical_record.id
                }
            }
        }
    }

    async deleteVaccinationRecord(user_id: string, dto: RecordDto): Promise<any> {
        const record = await this.vaccinationRecordRepository.findOne({
            where: { id: dto.record_id },
            relations: ['medical_record'],
        })

        if (!record)
            throw new NotFoundException('record_not_found')

        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: { id: record.medical_record.id },
            select: ['manager_id'],
        })

        if (user_id != medicalRecord.manager_id)
            throw new UnauthorizedException('unauthorized')

        await this.vaccinationRecordRepository.remove(record)

        return {
            message: 'successfully'
        }
    }

    async userRecords(user_id: string, record_id: string): Promise<any> {
        const medicalRecord = await this.medicalRecordRepository.findOne({
            where: {
                id: record_id
            },
            relations: ['vaccination_record']
        })

        if (user_id != medicalRecord.manager_id)
            throw new UnauthorizedException('unauthorized')

        if (!medicalRecord || !record_id)
            throw new NotFoundException('medical_record_not_found')

        const data = []

        for (const e of medicalRecord.vaccination_record) {
            const vaccination_history = await this.vaccinationRecordRepository.find({
                where: { id: e.id },
                relations: ['vaccine']
            });
            data.push(...vaccination_history);
        }

        return {
            data: data
        }
    }

    async baseVaccines(): Promise<any> {
        const data = await this.vaccineRepository.find()
        return {
            data: data
        }
    }
}
