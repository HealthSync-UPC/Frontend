/* {
  "id": 0,
  "name": "string",
  "code": "string",
  "description": "string",
  "quantity": 0,
  "unit": "string",
  "active": true,
  "location": "string"
} */

export class Item {
    id: number;
    categoryId: number;
    name: string;
    code: string;
    description: string
    quantity: number;
    unit: string;
    active: boolean;
    location: string;

    constructor(
        id: number,
        categoryId: number,
        name: string,
        code: string,
        description: string,
        quantity: number,
        unit: string,
        active: boolean,
        location: string
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.name = name;
        this.code = code;
        this.description = description;
        this.quantity = quantity;
        this.unit = unit;
        this.active = active;
        this.location = location;
    }
}