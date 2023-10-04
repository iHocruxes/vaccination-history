import { Module } from '@nestjs/common';
import { VaccinationController } from './controllers/vaccination.controller';
import { VaccinationService } from './services/vaccination.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationRecords } from './entities/record.entity';
import { Vaccines } from './entities/vaccine.entity';
import { MedicalRecord } from './entities/medical-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord, VaccinationRecords, Vaccines])
  ],
  controllers: [VaccinationController],
  providers: [VaccinationService]
})
export class VaccinationModule { }
