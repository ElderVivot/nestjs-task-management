import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'

import { IAccessToken } from './access-token.interface'
import { AuthCredentialsDto } from './dto/auth-credential.dto'
import { IJwtPayload } from './jwt-payload.interface'
import { UserRepository } from './user.repository'

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp (authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.userRepository.signUp(authCredentialsDto)
    }

    async signIn (authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
        const { username, password } = authCredentialsDto

        const user = await this.userRepository.findOne({ username })

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const passwordIsValid = await this.userRepository.validPassword(user, password)
        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload: IJwtPayload = { username }
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }
}