import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe } from '@nestjs/common'

import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { ITask, ETaskStatus } from './task.interface'
import { TaskService } from './task.service'

@Controller('tasks')
export class TaskController {
    constructor (private taskService: TaskService) { }

    @Get()
    getAllTasks (): ITask[] {
        return this.taskService.getAllTasks()
    }

    @Get('/:id')
    getTaskById (@Param('id') id: string): ITask {
        return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask (@Body() createTaskDto: CreateTaskDto): ITask {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteById (@Param('id') id: string): ITask[] {
        return this.taskService.deleteById(id)
    }

    @Patch('/:id/status')
    updateStatusById (
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: ETaskStatus
    ): ITask[] {
        return this.taskService.updateStatusById(id, status)
    }
}