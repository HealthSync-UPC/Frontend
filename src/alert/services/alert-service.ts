import http from "../../shared/services/http";
import { Alert } from "../model/alert";

export class AlertService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/zones';

    async getAlerts() {
        return await http.get<Alert[]>(`${this.endpoint}/alerts`);
    }

    async getAlertsById(zoneId: number) {
        return await http.get<Alert[]>(`${this.endpoint}/${zoneId}/alerts`);
    }
}

export const alertService = new AlertService();