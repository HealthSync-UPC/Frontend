import type { Readings } from "./reading";

export class Iot {
    id: number;
    name: string;
    serialNumber: string;
    type: string;
    location: string;
    status: string;
    unit: string;
    readings: Readings[];
    constructor(id: number, name: string, serialNumber: string, type: string, location: string, status: string, unit: string, readings: Readings[]) {
        this.id = id;
        this.name = name;
        this.serialNumber = serialNumber;
        this.type = type;
        this.location = location;
        this.status = status;
        this.unit = unit;
        this.readings = readings;
    }

}