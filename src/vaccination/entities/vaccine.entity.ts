import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { nanoid } from "nanoid";
import { Min } from "class-validator";
import { VaccinationRecords } from "./record.entity";

@Entity({ name: 'Vaccines' })
export class Vaccines {
    constructor() {
        this.id = nanoid()
    }

    @PrimaryColumn()
    @OneToOne(() => VaccinationRecords, e => e.vaccine)
    id: string

    @Column()
    disease: string

    @Column()
    @Min(1)
    max_dose: number

    @Column()
    is_child: boolean
}