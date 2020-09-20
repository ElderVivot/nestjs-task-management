import { Repository, EntityRepository } from 'typeorm'

import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { ETaskStatus } from './enums/task-status'
import { Task } from './task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks (filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto
        return await this.query(
            `SELECT *
               FROM task
              WHERE ( "status" = $1 OR $1 IS NULL )
                AND ( "title" LIKE '%' || $2 || '%' 
                    OR "description" LIKE '%' || $2 || '%' 
                    OR $2 IS NULL 
                    )`,
            [status, search]
        )
    }

    // async getTasksWithQueryBuilder (filterDto: GetTasksFilterDto): Promise<Task[]> {
    //     const { status, search } = filterDto
    //     const query = this.createQueryBuilder('task')

    //     if (status) {
    //         query.andWhere('task.status = :status', { status })
    //     }

    //     if (search) {
    //         query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
    //     }

    //     return await query.getMany()
    // }

    async createTask (createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto
        const task = await this.save({
            title, description, status: ETaskStatus.OPEN
        })

        return task
    }
}