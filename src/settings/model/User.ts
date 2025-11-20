export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    qr: string;
    password: string;
    position: string;

    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        qr: string,
        password: string,
        position: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.qr = qr;
        this.password = password;
        this.position = position;
    }

}

