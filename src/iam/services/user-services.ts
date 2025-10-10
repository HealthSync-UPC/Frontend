import http from "../../shared/services/http";
import type { QRCode } from "../model/qrcode";
import { User } from "../model/user";
import type { VerifyTotpRequest } from "../model/verify-totp-request";

export class AuthService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/auth';

    async register(user: User) {
        return await http.post<QRCode>(this.endpoint + "/sign-up", user);
    }

    async login(user: User) {
        return await http.post(this.endpoint + "/sign-in", user);
    }
    async verify(VerifyTotpRequest: VerifyTotpRequest) {
        return await http.post(this.endpoint + "/verify-totp", VerifyTotpRequest);
    }
    async generateqr(user: User) {
        return await http.post(this.endpoint + "/generate-qr", user);
    }
}

export const authService = new AuthService();
