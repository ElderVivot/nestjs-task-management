import { IsOptional, IsNotEmpty, IsIn } from 'class-validator'

import { ETaskStatus } from '../enums/task-status'

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([...Object.keys(ETaskStatus)])
    status: ETaskStatus

    @IsOptional()
    @IsNotEmpty()
    search: string
}