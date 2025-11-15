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
import type { Category } from "../../inventory/model/category";
import type { Item } from "../../inventory/model/item";
import { inventoryService } from "../../inventory/service/inventory-service";
import type { Member } from "../../zones/model/member";
import type { Zone } from "../../zones/model/zone";
import { zonesService } from "../../zones/services/zones-services";
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

    // Inventory
    categories: Category[];
    items: Item[];
    getCategories: () => Promise<void>;
    addCategory: (category: Category) => Promise<void>;
    deleteCategory: (category: Category) => Promise<void>;
    getItems: () => Promise<void>;
    addItem: (item: Item) => Promise<void>;
    deleteItem: (item: Item) => Promise<void>;

    // Zones
    zones: Zone[];
    getZones: () => Promise<void>;
    addZone: (zone: Zone) => Promise<void>;
    deleteZone: (zone: Zone) => Promise<void>;
    addMemberToZone: (zone: Zone, member: Member) => Promise<void>;
    removeMemberFromZone: (zone: Zone, member: Member) => Promise<void>;
    addItemToZone: (zone: Zone, item: Item) => Promise<void>;
    removeItemFromZone: (zone: Zone, item: Item) => Promise<void>;
    addIotToZone: (zone: Zone, iot: Iot) => Promise<void>;
    removeIotFromZone: (zone: Zone, iot: Iot) => Promise<void>;
    tryAccess: (zone: Zone, member: Member) => Promise<boolean>;

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

    // Inventory
    categories: [],
    items: [],
    getCategories: async () => {
        try {
            const response = await inventoryService.getCategories();
            if (response.data) {
                set(state => {
                    state.categories = response.data;
                });
                console.log("Fetched categories:", response.data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    },
    addCategory: async (category: Category) => {
        try {
            const response = await inventoryService.addCategory(category);

            if (response.data) {
                set(state => {
                    state.categories.push(response.data);
                });
            }
        } catch (error) {
            console.error("Error adding category:", error);
        }
    },
    deleteCategory: async (category: Category) => {
        try {
            const response = await inventoryService.deleteCategory(category);

            if (response.status == 204) {
                set(state => {
                    state.categories = state.categories.filter(cat => cat.id !== category.id);
                });
                console.log(`Deleted category with id: ${category.id}`);
            }
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    },
    getItems: async () => {
        try {
            const response = await inventoryService.getItems();

            if (response.data) {
                set(state => {
                    state.items = response.data;
                });
                console.log("Fetched items:", response.data);
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    },
    addItem: async (item: Item) => {
        try {
            const response = await inventoryService.addItem(item);
            if (response.data) {
                const newItem = response.data;
                const updatedCategories = get().categories.map(category => {
                    if (category.id === newItem.categoryId) {
                        return {
                            ...category,
                            items: [...(category.items || []), newItem],
                        };
                    }
                    return category;
                });

                set(state => {
                    state.categories = updatedCategories;
                });
                set(state => {
                    state.items.push(newItem);
                });
                console.log("Added item:", response.data);
            }
        } catch (error) {
            console.error("Error adding item:", error);
        }
    },
    deleteItem: async (item: Item) => {
        try {
            const response = await inventoryService.deleteItem(item);

            if (response.status == 204) {
                const updatedCategories = get().categories.map(category => {
                    if (category.id === item.categoryId) {
                        return {
                            ...category,
                            items: (category.items || []).filter(it => it.id !== item.id),
                        };
                    }
                    return category;
                });
                set(state => {
                    state.categories = updatedCategories;
                });
                set(state => {
                    state.items = state.items.filter(it => it.id !== item.id);
                });
                console.log(`Deleted item with id: ${item.id}`);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    },

    // Zones
    zones: [],
    getZones: async () => {
        try {
            const response = await zonesService.getZones();
            if (response.data) {
                set(state => {
                    state.zones = response.data;
                });
                console.log("Fetched zones:", response.data);
            }
        } catch (error) {
            console.error("Error fetching zones:", error);
        }
    },
    addZone: async (zone: Zone) => {
        try {
            const response = await zonesService.addZone(zone);
            if (response.data) {
                set(state => {
                    state.zones.push(response.data);
                });
                console.log("Added zone:", response.data);
            }
        } catch (error) {
            console.error("Error adding zone:", error);
        }
    },
    deleteZone: async (zone: Zone) => {
        try {
            const response = await zonesService.deleteZone(zone);
            if (response.status == 204) {
                set(state => {
                    state.zones = state.zones.filter(z => z.id !== zone.id);
                });
                console.log(`Deleted zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error deleting zone:", error);
        }
    },
    addMemberToZone: async (zone: Zone, member: Member) => {
        try {
            const response = await zonesService.addMemberToZone(zone, member);
            if (response.data) {
                set(state => {
                    state.zones.push(response.data);
                });
                console.log(`Added member with id: ${member.id} to zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error adding member to zone:", error);
        }
    },
    removeMemberFromZone: async (zone: Zone, member: Member) => {
        try {
            const response = await zonesService.removeMemberFromZone(zone, member);
            if (response.status == 204) {
                set(state => {
                    state.zones = state.zones.filter(z => z.id !== zone.id);
                });
                console.log(`Removed member with id: ${member.id} from zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error removing member from zone:", error);
        }
    },
    addItemToZone: async (zone: Zone, item: Item) => {
        try {
            const response = await zonesService.addItemToZone(zone, item);
            if (response.data) {
                set(state => {
                    state.zones.push(response.data);
                });
                console.log(`Added item with id: ${item.id} to zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error adding item to zone:", error);
        }
    },
    removeItemFromZone: async (zone: Zone, item: Item) => {
        try {
            const response = await zonesService.removeItemFromZone(zone, item);
            if (response.status == 204) {
                set(state => {
                    state.zones = state.zones.filter(z => z.id !== zone.id);
                });
                console.log(`Removed item with id: ${item.id} from zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error removing item from zone:", error);
        }
    },
    addIotToZone: async (zone: Zone, iot: Iot) => {
        try {
            const response = await zonesService.addIotToZone(zone, iot);
            if (response.data) {
                set(state => {
                    state.zones.push(response.data);
                });
                console.log(`Added IoT with id: ${iot.id} to zone with id: ${zone.id}`);
            }
        } catch (error) {
            console.error("Error adding IoT to zone:", error);
        }
    },
    removeIotFromZone: async (zone: Zone, iot: Iot) => {
        try {
            const response = await zonesService.removeIotFromZone(zone, iot);
            if (response.status == 204) {
                set(state => {
                    state.zones = state.zones.filter(z => z.id !== zone.id);
                });
                console.log(`Removed IoT with id: ${iot.id} from zone with id: ${zone.id}`);
            }
        }
        catch (error) {
            console.error("Error removing IoT from zone:", error);
        }
    },
    tryAccess: async (zone: Zone, member: Member) => {
        try {
            const response = await zonesService.tryAccess(zone, member);
            if (response.data) {
                console.log(`Access attempt by member with id: ${member.id} to zone with id: ${zone.id} - Granted: ${response.data.accessGranted}`);
                return response.data.accessGranted;
            }
            return false;
        } catch (error) {
            console.error("Error trying access to zone:", error);
            return false;
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