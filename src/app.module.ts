import { Module } from '@nestjs/common';
import { VaccinationModule } from './vaccination/vaccination.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresOption } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgresOption,
      autoLoadEntities: true
    }),
    AuthModule,
    VaccinationModule,
  ],
})
export class AppModule { }
