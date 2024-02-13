import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    title : string ='My Profile'
    ngOnInit(): void {
    }

    constructor(private loginService: LoginService) {
    }

    // currentUser: User = {
    //     id: 0,
    //     name: '',
    //     gender: '',
    //     username: '',
    //     email: '',
    //     image: '',
    //     password: '',
    //     isEnabled: false
    //
    // };
    // constructor(private http: HttpClient, private loginService: LoginService) {
    //     // @ts-ignore
    //     this.currentUser = this.loginService.login();
    //
    // }
    //
    // ngOnInit(): void {
    // }


    logoutUser(){
        this.loginService.logout();
        location.reload();
    }
}
