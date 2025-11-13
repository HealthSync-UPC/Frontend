import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "../../iam/model/user";
import { VerifyTotpRequest } from "../../iam/model/verify-totp-request";
import { authService } from "../../iam/services/user-services";
import type { JwtPayload } from "jwt-decode";
import { getTokenData } from "../utils/jwt-decode";
import { User as Profile } from "../../settings/model/User";
import { profileService } from "../../settings/services/userService";
interface GlobalState {
    // IAM
    user: User;
    setUser: (user: Partial<User>) => void;
    register: () => Promise<boolean>;
    login: () => Promise<"200" | "202" | "error">;
    qrCode?: string;
    verifyCode: (code: number) => Promise<boolean>;
    jwt: JwtPayload | null;

    // Settings
    profiles: Profile[],
    getProfiles: () => Promise<void>;
}

export const useGlobalStore = create(immer<GlobalState>((set, get) => ({
    // IAM
    user: new User("", "", ""),
    setUser: (user: Partial<User>) => set((state) => {
        state.user = Object.assign(new User("", "", ""), { ...state.user, ...user });
    }),
    register: async () => {
        try {
            const user = get().user;
            const response = await authService.register(user);

            if (response.data) {
                set(state => {
                    state.qrCode = response.data.qrCode;
                })
            }


            return response.status == 201;
        } catch (error) {
            console.error("Error during registration:", error);
            return false;
        }
    },
    login: async () => {
        try {
            const user = get().user;
            const response = await authService.login(user);

            if (response.status == 200) {
                return "200";
            }
            else if (response.status == 202) {
                set(state => {
                    state.qrCode = response.data.qrCode;
                })
                return "202";
            }

            return "200";
        } catch (error) {
            console.error("Error during login:", error);
            return "error";
        }
    },
    verifyCode: async (code: number) => {
        try {
            const req = new VerifyTotpRequest(get().user.email, code.toString());
            const response = await authService.verify(req);

            if (response.data) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                set(state => { state.jwt = getTokenData(token); });
            }

            return response.status == 200;
        } catch (error) {
            console.error("Error during code verification:", error);
            return false;
        }
    },
    jwt: null,

    // Settings
    profiles: [],
    getProfiles: async () => {
        try {
            const response = await profileService.getAllProfiles();
            if (response.data) {
                set(state => {
                    state.profiles = response.data;
                });

                console.log("Fetched profiles:", response.data);
            }
        } catch (error) {
            console.error("Error fetching profiles:", error);
        }
    }
})));