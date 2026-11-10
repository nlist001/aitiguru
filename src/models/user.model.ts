import { BaseModel } from "./base.model";

export interface IUser {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    accessToken: string;
    refreshToken: string;
}

export class User extends BaseModel implements IUser {
    id = '';
    username = '';
    email = '';
    firstName = '';
    lastName = '';
    gender = '';
    image = '';
    accessToken = '';
    refreshToken = '';
   
    constructor(o: any) {
        super();
        super.checkFields(o);
    }
}