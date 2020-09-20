import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, ParseIntPipe, Query } from '@nestjs/common'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { ETaskStatus } from './enums/task-status'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { Task } from './task.entity'
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
    constructor (private taskService: TaskService) { }

    @Get()
    async getTasks (@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return await this.taskService.getTasks(filterDto)
    }

    @Get('/:id')
    async getTaskById (@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return await this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask (@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return await this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    async deleteById (@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.taskService.deleteById(id)
    }

    @Patch('/:id/status')
    async updateStatusById (
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: ETaskStatus
    ): Promise<Task> {
        return await this.taskService.updateStatusById(id, status)
    }
}