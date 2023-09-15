import { Module } from '@nestjs/common';
import { VaccinationController } from './controllers/vaccination.controller';
import { VaccinationService } from './services/vaccination.service';

@Module({
  controllers: [VaccinationController],
  providers: [VaccinationService]
})
export class VaccinationModule { }
