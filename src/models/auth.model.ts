import { BaseModel } from "./base.model";

export interface ILogin {
    username: string;
	password: string;
	keepme: boolean;
}

export class LoginModel extends BaseModel  implements ILogin {
    username = '';
    password = '';
    keepme = false;

    constructor(o?: any) {
        super();
        super.checkFields(o);
    }
}