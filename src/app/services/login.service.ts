import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private apiServiceUrl: string = environment.apiBaseUrl;


    constructor(private http: HttpClient) {
    }

    public generateToken(credential: any) {
        return this.http.post(`${this.apiServiceUrl}/user/login`, credential);
    }

    public login(login: any): boolean {
        localStorage.setItem("token", login);
        return true;
    }

    //To check whether the user is logged in or not
    public isLoggedIn(): boolean {
        let token: String | null = localStorage.getItem("login");
        if (token == undefined || token === '' || token == null) {
            return false;
        } else {
            return true;
        }
    }

    // for logout the user and also remove the token
    public logout(): boolean {
        localStorage.removeItem("token");
        return true;
    }

    // for getting the token
    public getToken(): void {
        localStorage.getItem("token");
    }
}
