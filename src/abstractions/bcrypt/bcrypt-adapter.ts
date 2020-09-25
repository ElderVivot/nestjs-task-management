export interface IBcryptAdapter {
    generateSalt(): Promise<string>
    hash(password: string): Promise<string>
    compare(password: string, passwordEncrypted: string): Promise<boolean>
}