import { v4 as uuid } from 'uuid'

import { Injectable, NotFoundException } from '@nestjs/common'

import { CreateTaskDto } from './dto/create-task.dto'
import { ITask, ETaskStatus } from './task.interface'

@Injectable()
export class TaskService {
    private tasks: ITask[] = []

    getAllTasks (): ITask[] {
        return this.tasks
    }

    getTaskById (id: string): ITask {
        const found = this.tasks.find(task => task.id === id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    createTask (createTaskDto: CreateTaskDto): ITask {
        const { title, description } = createTaskDto
        const task: ITask = {
            id: uuid(), title, description, status: ETaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteById (id: string): ITask[] {
        this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== id)
        return this.tasks
    }

    updateStatusById (id: string, status: ETaskStatus): ITask[] {
        this.getTaskById(id)
        this.tasks.map(task => {
            if (task.id === id) {
                task.status = status
            }
        })
        return this.tasks
    }
}