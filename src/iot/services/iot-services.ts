import http from "../../shared/services/http";
import type { Createreading } from "../model/createreading";
import type { Iot } from "../model/iot";

export class IotService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/devices';

    async createDevice(iot: Iot) {
        return await http.post<Iot>(this.endpoint, iot);
    }

    async getDevices() {
        return await http.get<Iot[]>(this.endpoint);
    }

    async createDeviceReading(createreading: Createreading) {
        return await http.post<Iot>(this.endpoint, createreading);
    }

    async deleteDevice(iot: Iot) {
        return await http.delete(this.endpoint + "/" + iot.id);
    }
}

export const iotService = new IotService();