import { Injectable } from '@nestjs/common';

@Injectable()
export class VaccinationService {
    constructor() {

    }

    async test() {
        return "HELLO TEST"
    }
}
