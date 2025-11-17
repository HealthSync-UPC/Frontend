export class AccessLog {
    id: number;
    name: string;
    accessTime: Date;
    accessGranted: boolean;

    constructor(id: number, name: string, accessTime: Date, accessGranted: boolean) {
        this.id = id;
        this.name = name;
        this.accessTime = accessTime;
        this.accessGranted = accessGranted;
        this.accessGranted = accessGranted;
    }
}