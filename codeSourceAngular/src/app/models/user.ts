export class User {

    /**
     *
     */
    constructor(
        _email: string,
        _password: string
    ) {

        this.email = _email;
        this.password = _password;

    }

    public get email(): string {
        return this.email;
    }
    public set email(value: string) {
        this.email = value;
    }


    public get password(): string {
        return this.password;
    }
    public set password(value: string) {
        this.password = value;
    }
}
