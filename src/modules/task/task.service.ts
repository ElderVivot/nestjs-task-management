import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { ETaskStatus } from './enums/task-status'
import { Task } from './task.entity'
import { TaskRepository } from './task.repository'

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks (filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto)
    }

    async getTaskById (id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    async createTask (createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto)
    }

    async deleteById (id: number): Promise<void> {
        await this.getTaskById(id)
        await this.taskRepository.delete({ id })
    }

    async updateStatusById (id: number, status: ETaskStatus): Promise<Task> {
        await this.getTaskById(id)
        await this.taskRepository.update({ id }, { status })
        return this.getTaskById(id)
    }
}