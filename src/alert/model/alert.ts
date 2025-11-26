/* {
  "id": 0,
  "type": "LOW_TEMPERATURE",
  "zoneId": 0,
  "location": "string",
  "registeredAt": "2025-11-26T02:17:58.463Z"
} */

export class Alert {
    id: number;
    type: string;
    zoneId: number;
    location: string;
    registeredAt: Date;

    constructor(
        id: number,
        type: string,
        zoneId: number,
        location: string,
        registeredAt: Date) {
        this.id = id;
        this.type = type;
        this.zoneId = zoneId;
        this.location = location;
        this.registeredAt = registeredAt;
    }
}