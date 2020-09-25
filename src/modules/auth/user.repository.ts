import { makeBcryptImplementation } from 'src/abstractions/bcrypt/bcrypt-factory'
import { BcryptImplementation } from 'src/abstractions/bcrypt/bcrypt-implementation'
import { Repository, EntityRepository } from 'typeorm'

import { ConflictException, InternalServerErrorException } from '@nestjs/common'

import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    private bcryptImplementation: BcryptImplementation

    constructor () {
        super()
        this.bcryptImplementation = makeBcryptImplementation()
    }

    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        const passwordCrypt = await this.hashPassword(password)
        console.log(passwordCrypt)

        try {
            await this.save({ username, password: passwordCrypt })
        } catch (error) {
            if (error.code === '23505') { // already exists
                throw new ConflictException('Username already exists')
            } else {
                throw new InternalServerErrorException(error)
            }
        }
    }

    async validPassword (user: User, password: string): Promise<boolean> {
        return await this.bcryptImplementation.compare(password, user.password)
    }

    private async hashPassword (password: string) {
        return this.bcryptImplementation.hash(password)
    }
}