import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { User } from "../../iam/model/user";
import { VerifyTotpRequest } from "../../iam/model/verify-totp-request";
import { authService } from "../../iam/services/user-services";
import type { JwtPayload } from "jwt-decode";
import { getTokenData } from "../utils/jwt-decode";
import { User as Profile } from "../../settings/model/User";
import { profileService } from "../../settings/services/userService";
import type { Iot } from "../../iot/model/iot";
import type { Createreading } from "../../iot/model/createreading";
import { iotService } from "../../iot/services/iot-services";
interface GlobalState {
    // IAM
    user: User;
    setUser: (user: Partial<User>) => void;
    register: () => Promise<boolean>;
    login: () => Promise<"200" | "202" | "error">;
    qrCode?: string;
    verifyCode: (code: number) => Promise<boolean>;
    jwt: JwtPayload | null;
    setJwt: (token: string) => void;

    // IoT
    devices: Iot[];
    getDevices: () => Promise<void>;
    createDevice: (iot: Iot) => Promise<void>;
    createDeviceReading: (reading: Createreading) => Promise<void>;
    deleteDevice: (iot: Iot) => Promise<void>;

    // Settings
    profiles: Profile[],
    getProfiles: () => Promise<void>;
    addProfile: (profile: Profile) => Promise<void>;
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
    setJwt: (token: string) => {
        set(state => {
            state.jwt = getTokenData(token);
        });
    },
    // IoT
    devices: [],
    getDevices: async () => {
        try {
            const response = await iotService.getDevices();
            if (response.data) {
                set(state => {
                    state.devices = response.data;
                });
                console.log("Fetched devices:", response.data);
            }
        } catch (error) {
            console.error("Error fetching devices:", error);
        }
    },
    createDevice: async (iot: Iot) => {
        try {
            const response = await iotService.createDevice(iot);
            if (response.data) {
                set(state => {
                    state.devices.push(response.data!);
                });
                console.log("Created device:", response.data);
            }
        } catch (error) {
            console.error("Error creating device:", error);
        }
    },
    createDeviceReading: async (reading: Createreading) => {
        try {
            const response = await iotService.createDeviceReading(reading);

            if (response.data) {
                const updatedDevice = response.data;
                const updatedDevices = get().devices.map(device =>
                    device.id === updatedDevice.id ? updatedDevice : device
                );
                set(state => {
                    state.devices = updatedDevices;
                });
                console.log("Created device reading:", response.data);
            }

        } catch (error) {
            console.error("Error creating device reading:", error);
        }
    },
    deleteDevice: async (iot: Iot) => {
        try {
            const response = await iotService.deleteDevice(iot);
            if (response.status == 204) {
                set(state => {
                    state.devices = state.devices.filter(device => device.id !== iot.id);
                });
                console.log(`Deleted device with id: ${iot.id}`);
            }
        } catch (error) {
            console.error("Error deleting device:", error);
        }
    },
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
    },
    addProfile: async (profile: Profile) => {
        try {
            const response = await profileService.create(profile);
            if (response.data) {
                set(state => {
                    state.profiles.push(response.data!);
                });
            }
        } catch (error) {
            console.error("Error adding profile:", error);
        }
    }
})));