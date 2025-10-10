import { User } from './user'; // Ajusta la ruta si es necesario

export class VerifyTotpRequest {
    email: string;
    code: string;

    constructor(email: string, code: string) {
        this.email = email;
        this.code = code;
    }

    static fromUser(user: User, code: string): VerifyTotpRequest {
        return new VerifyTotpRequest(user.email, code);
    }
}