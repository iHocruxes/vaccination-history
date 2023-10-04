import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { nanoid } from "nanoid";
import { Gender, Relationship } from "../../config/enum.constants";
import { VaccinationRecords } from "./record.entity";

@Entity({ name: 'MedicalRecords' })
export class MedicalRecord {
    constructor() {
        this.id = nanoid()
    }

    @PrimaryColumn()
    id: string

    @Column({ name: 'full_name' })
    full_name: string

    @Column({ type: 'timestamp', name: 'date_of_birth' })
    date_of_birth: Date

    @Column({ name: 'gender', type: 'enum', enum: Gender })
    gender: string

    @Column({ name: 'relationship', type: 'enum', enum: Relationship, nullable: true })
    relationship: string

    @Column({ nullable: true })
    avatar: string

    @Column()
    address: string

    @Column({ name: 'is_main_profile', default: false })
    isMainProfile: boolean

    @Column({ type: 'timestamp', name: 'update_at', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => VaccinationRecords, e => e.medical_record)
    vaccination_record: VaccinationRecords[]

    @Column({ name: 'manager_id' })
    manager_id: string

}