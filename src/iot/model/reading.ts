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
    readingAt: Date;


    constructor(id: number, value: string, readingAt: Date) {
        this.id = id;
        this.value = value;
        this.readingAt = readingAt;
    }
}
