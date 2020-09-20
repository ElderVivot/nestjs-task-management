import { Repository, EntityRepository } from 'typeorm'

import { ConflictException, InternalServerErrorException } from '@nestjs/common'

import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        try {
            await this.save({
                username, password
            })
        } catch (error) {
            if (error.code === '23505') { // already exists
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException()
            }
        }
    }
}