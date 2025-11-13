export class User {
    firstName: string;
    lastName: string;
    email: string;
    qr: string;
    password: string;
    position: string;

    constructor(firstname: string, lastName: string, email: string, qr: string, password: string, position: string) {
        this.firstName = firstname;
        this.lastName = lastName;
        this.email = email;
        this.qr = qr;
        this.password = password;
        this.position = position;
    }

}

