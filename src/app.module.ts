import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { typeOrmConfig } from './config/typeorm'
import { AuthModule } from './modules/auth/auth.module'
import { TaskModule } from './modules/task/task.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TaskModule,
        AuthModule
    ]
})
export class AppModule {}