export class User {
    email: string;
    password: string;
    organizationName: string;

    constructor(email: string, password: string, organizationName: string) {
        this.email = email;
        this.password = password;
        this.organizationName = organizationName;
    }
}
