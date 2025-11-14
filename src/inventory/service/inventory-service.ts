import http from "../../shared/services/http";
import { Category } from "../model/category";
import type { Item } from "../model/item";

export class InventoryService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/inventory';

    async getItems() {
        return http.get<Item[]>(`${this.endpoint}/items`);
    }

    async addItem(item: Item) {
        return http.post<Item>(`${this.endpoint}/items`, item);
    }

    async deleteItem(item: Item) {
        return http.delete(`${this.endpoint}/items/${item.id}`);
    }

    async getCategories() {
        return http.get<Category[]>(`${this.endpoint}/categories`);
    }

    async addCategory(category: Category) {
        return http.post<Category>(`${this.endpoint}/categories`, category);
    }

    async deleteCategory(category: Category) {
        return http.delete(`${this.endpoint}/categories/${category.id}`);
    }
}

export const inventoryService = new InventoryService();