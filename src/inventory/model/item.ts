/* {
  "id": 0,
  "categoryName": "string",
  "name": "string",
  "code": "string",
  "description": "string",
  "quantity": 0,
  "unit": "string",
  "active": true,
  "location": "string",
  "expirationDate": "2025-11-14"
} */

export class Item {
    id: number;
    categoryId: number;
    categoryName: string;
    name: string;
    code: string;
    description: string
    quantity: number;
    unit: string;
    active: boolean;
    location: string;
    expirationDate?: Date;

    constructor(
        id: number,
        categoryId: number,
        categoryName: string,
        name: string,
        code: string,
        description: string,
        quantity: number,
        unit: string,
        active: boolean,
        location: string,
        expirationDate?: Date
    ) {
        this.id = id;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.name = name;
        this.code = code;
        this.description = description;
        this.quantity = quantity;
        this.unit = unit;
        this.active = active;
        this.location = location;
        this.expirationDate = expirationDate;
    }
}