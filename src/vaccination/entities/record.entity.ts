import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { nanoid } from "nanoid";
import { Min } from "class-validator";
import { Vaccines } from "./vaccine.entity";
import { MedicalRecord } from "./medical-record.entity";

@Entity({ name: 'VaccinationRecords' })
export class VaccinationRecords {
    constructor() {
        this.id = nanoid()
    }

    @PrimaryColumn()
    id: string

    @ManyToOne(() => MedicalRecord, e => e.vaccination_record, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'medical_record' })
    medical_record: MedicalRecord

    @ManyToOne(() => Vaccines, e => e.id, { onDelete: 'NO ACTION' })
    @JoinColumn()
    vaccine: Vaccines

    @Column()
    @Min(0)
    dose_number: number

    @Column()
    date: string

    @Column({ type: 'timestamp', name: 'update_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}