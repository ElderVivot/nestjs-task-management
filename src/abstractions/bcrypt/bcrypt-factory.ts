import { BcryptImplementation } from './bcrypt-implementation'

export function makeBcryptImplementation (): BcryptImplementation {
    return new BcryptImplementation()
}