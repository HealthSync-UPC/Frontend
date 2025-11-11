/* "readings": [
    {
      "id": 0,
      "value": "string",
      "numericValue": 0,
      "readingAt": "2025-11-04T00:03:22.952Z"
      {
  
}
    } */

export class Readings {
    id: number;
    value: string;
    numericValue: number;
    readingAt: Date;


    constructor(id: number, value: string, numericValue: number, readingAt: Date) {
        this.id = id;
        this.value = value;
        this.numericValue = numericValue;
        this.readingAt = readingAt;
    }
}
