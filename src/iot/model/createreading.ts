/* {
  "deviceId": 0,
  "value": "string",
  "numericValue": 0
} */
export class Createreading {
  deviceId: number;
  value: string;

  constructor(deviceId: number, value: string) {
    this.deviceId = deviceId;
    this.value = value;
  }
}
