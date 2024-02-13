import {Component} from '@angular/core';
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    protected readonly faUser = faUser;

    name: String = "";
    username: String = "";
    gender: String = "";
    email: String = "";
    password: String = "";

    constructor(private http: HttpClient) {
    }

    register(): void {
        let bodyData = {
            name: this.name,
            username: this.username,
            gender: this.gender,
            email: this.email,
            password: this.password
        };

        this.http.post("http://localhost:8080/user/register", bodyData, {responseType: 'text'})
            .subscribe((resultData: any) => {
                console.log(resultData);
                alert("User Registered successfully");
            });
    }


}
