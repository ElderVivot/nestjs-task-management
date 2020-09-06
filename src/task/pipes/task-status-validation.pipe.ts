import { PipeTransform, BadRequestException } from '@nestjs/common'

import { ETaskStatus } from '../task.interface'

export class TaskStatusValidationPipe implements PipeTransform {
    private readonly allowedStatuses = [...Object.keys(ETaskStatus)]

    transform (value: any): ETaskStatus {
        value = value.toUpperCase()

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`Value for status is invalid: ${value}`)
        }

        return value
    }

    private isStatusValid (status: any) {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
}