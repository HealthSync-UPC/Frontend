import http from "../../shared/services/http";
import type { User } from "../model/User";

export class UserService {
    private endpoint = import.meta.env.VITE_API_BASE_URL + '/profiles';

    async create(profile: User) {
        return await http.post<User>(this.endpoint, profile);
    }
    async getprofile() {
        return await http.get<User>(this.endpoint);
    }
    async createall(profile: User) {
        return await http.post<User>(this.endpoint + "/all", profile);
    }

}