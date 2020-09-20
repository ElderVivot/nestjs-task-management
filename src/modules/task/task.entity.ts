import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

import { ETaskStatus } from './enums/task-status'

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    status: ETaskStatus
}