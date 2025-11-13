import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
    iss: string;
    sub: string;
    iat: number;
    exp: number;
    role: string;
}

export function isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
        const decoded: JwtPayload = jwtDecode(token);
        return decoded.exp * 1000 > Date.now();
    } catch (err) {
        return false;
    }
}

export function getTokenData(token: string | null): JwtPayload | null {
    if (!token) return null;

    try {
        return jwtDecode<JwtPayload>(token);
    } catch {
        return null;
    }
}