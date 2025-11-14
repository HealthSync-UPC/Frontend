/* {
  "id": 0,
  "name": "string",
  "description": "string",
  "items": [
    {
      "id": 0,
      "name": "string",
      "code": "string",
      "description": "string",
      "quantity": 0,
      "unit": "string",
      "active": true,
      "location": "string"
    }
  ]
} */

import type { Item } from "./item";

export class Category {
    id: number;
    name: string;
    description: string;
    items: Item[];

    constructor(
        id: number,
        name: string,
        description: string,
        items: Item[]
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.items = items;
    }
}