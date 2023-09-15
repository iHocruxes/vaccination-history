import { Controller, Post, UseGuards } from '@nestjs/common';
import { VaccinationService } from '../services/vaccination.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller()
export class VaccinationController {
    constructor(
        private readonly vaccinationService: VaccinationService
    ) {

    }

    @UseGuards(JwtGuard)
    @Post()
    async test() {
        return await this.vaccinationService.test()
    }
}
