/* {
  "id": 0,
  "name": "string",
  "devices": [
    {
      "id": 0,
      "name": "string",
      "serialNumber": "string",
      "unit": "string",
      "type": "string",
      "location": "string",
      "status": "string",
      "readings": [
        {
          "id": 0,
          "value": 0,
          "readingAt": "2025-11-15T02:47:35.702Z"
        }
      ]
    }
  ],
  "items": [
    {
      "id": 0,
      "categoryName": "string",
      "name": "string",
      "code": "string",
      "description": "string",
      "quantity": 0,
      "unit": "string",
      "active": true,
      "location": "string",
      "expirationDate": "2025-11-15"
    }
  ],
  "members": [
    {
      "id": 0,
      "name": "string"
    }
  ],
  "accessLogs": [
    {
      "id": 0,
      "name": "string",
      "accessTime": "string",
      "accessGranted": true
    }
  ]
} */

import type { Item } from "../../inventory/model/item";
import type { Iot } from "../../iot/model/iot";
import type { AccessLog } from "./access-log";
import type { Member } from "./member";

export class Zone {
  id: number;
  name: string;
  devices: Iot[];
  items: Item[];
  members: Member[];
  accessLogs: AccessLog[];
  minTemperature: number;
  maxTemperature: number;
  minHumidity: number;
  maxHumidity: number;

  constructor(
    id: number,
    name: string,
    devices: Iot[],
    items: Item[],
    members: Member[],
    accessLogs: AccessLog[],
    minTemperature: number,
    maxTemperature: number,
    minHumidity: number,
    maxHumidity: number
  ) {
    this.id = id;
    this.name = name;
    this.devices = devices;
    this.items = items;
    this.members = members;
    this.accessLogs = accessLogs;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.minHumidity = minHumidity;
    this.maxHumidity = maxHumidity;
  }
}