import { Module } from '@nestjs/common';
import { VaccinationModule } from './vaccination/vaccination.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    VaccinationModule
  ],
})
export class AppModule { }
