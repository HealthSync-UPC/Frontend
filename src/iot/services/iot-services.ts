import http from "../../shared/services/http";
import type { Createreading } from "../model/createreading";
import type { Iot } from "../model/iot";

export class IotService {
    private endpoint = import.meta.env.BASE_URL + '/devices';
    async create(iot: Iot) {
        return await http.post<Iot>(this.endpoint, iot);
    }
    async getiot() {
        return await http.get<Iot>(this.endpoint);
    }
    async createiotreading(createreading: Createreading) {
        return await http.post<Iot>(this.endpoint, createreading);
    }




}