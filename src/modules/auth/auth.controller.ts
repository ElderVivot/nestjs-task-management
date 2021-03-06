import { Controller, Post, Body, ValidationPipe } from '@nestjs/common'

import { IAccessToken } from './access-token.interface'
import { AuthService } from './auth.service'
import { AuthCredentialsDto } from './dto/auth-credential.dto'

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @Post('/signup')
    async signUp (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    async signIp (@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<IAccessToken> {
        return await this.authService.signIn(authCredentialsDto)
    }
}