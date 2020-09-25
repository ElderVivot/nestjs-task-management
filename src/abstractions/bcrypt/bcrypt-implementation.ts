import * as bcrypt from 'bcrypt'

import { IBcryptAdapter } from './bcrypt-adapter'

export class BcryptImplementation implements IBcryptAdapter {
    async generateSalt (): Promise<string> {
        return await bcrypt.genSalt()
    }

    async hash (password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async compare (password: string, passwordEncrypted: string): Promise<boolean> {
        return await bcrypt.compare(password, passwordEncrypted)
    }
}