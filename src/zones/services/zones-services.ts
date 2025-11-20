import type { Item } from "../../inventory/model/item";
import type { Iot } from "../../iot/model/iot";
import http from "../../shared/services/http";
import type { Member } from "../model/member";
import { Zone } from "../model/zone";

export class ZonesServices {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/zones';

    async getZoneById(id: number) {
        return http.get<Zone>(`${this.endpoint}/${id}`);
    }

    async getZones() {
        return http.get<Zone[]>(this.endpoint);
    }

    async addZone(zone: Zone) {
        const data = {
            name: zone.name,
            deviceId: zone.devices.find(d => d.type === 'ACCESS_NFC')!.id,
            deviceIds: zone.devices.filter(d => d.type !== 'ACCESS_NFC').map(d => d.id),
            itemIds: zone.items.map(i => i.id),
            memberIds: zone.members.map(m => m.id)
        }

        return http.post<Zone>(this.endpoint, data);
    }

    async deleteZone(zone: Zone) {
        return http.delete<void>(`${this.endpoint}/${zone.id}`);
    }

    async addMemberToZone(zone: Zone, member: Member) {
        const data = { userId: member.id };
        return http.post<Zone>(`${this.endpoint}/${zone.id}/members`, data);
    }

    async removeMemberFromZone(zone: Zone, member: Member) {
        return http.delete<Zone>(`${this.endpoint}/${zone.id}/members/${member.id}`);
    }

    async addItemToZone(zone: Zone, item: Item) {
        const data = { itemId: item.id };
        return http.post<Zone>(`${this.endpoint}/${zone.id}/items`, data);
    }

    async removeItemFromZone(zone: Zone, item: Item) {
        return http.delete<Zone>(`${this.endpoint}/${zone.id}/items/${item.id}`);
    }

    async addIotToZone(zone: Zone, iot: Iot) {
        const data = { deviceId: iot.id };
        return http.post<Zone>(`${this.endpoint}/${zone.id}/devices`, data);
    }

    async removeIotFromZone(zone: Zone, iot: Iot) {
        return http.delete<Zone>(`${this.endpoint}/${zone.id}/devices/${iot.id}`);
    }

    async tryAccess(zone: Zone, member: Member) {
        const data = { userId: member.id };
        return http.post<{ accessGranted: boolean }>(`${this.endpoint}/${zone.id}/access`, data);
    }
}

export const zonesService = new ZonesServices();