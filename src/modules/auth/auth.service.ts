import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(authCredentialsDto)
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto

        const user = await this.userRepository.findOne({ username })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const passwordIsValid = await this.userRepository.validPassword(user, password)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
    }
}