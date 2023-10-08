import { Module } from '@nestjs/common';
import { VaccinationModule } from './vaccination/vaccination.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresOption, redisClientOption } from './config/database.config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisClientOptions } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...postgresOption,
      autoLoadEntities: true
    }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      ...redisClientOption
    }),
    AuthModule,
    VaccinationModule,
  ],
})
export class AppModule { }
