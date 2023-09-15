import { Module } from '@nestjs/common';
import { JwtStrategy } from './stategies/jwt.strategy';
import { VaccinationService } from '../vaccination/services/vaccination.service';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv'

@Module({
    imports: [
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SERVICE
        })
    ],
    providers: [
        JwtStrategy,
        VaccinationService
    ]
})
export class AuthModule { }
