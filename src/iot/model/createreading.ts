/* {
  "deviceId": 0,
  "value": "string",
  "numericValue": 0
} */
export class Createreading {
    deviceId: number;
    value: string;
    numericValue: number;

    constructor(deviceId: number, value: string, numericValue: number) {
        this.deviceId = deviceId;
        this.value = value;
        this.numericValue = numericValue;

    }
}
