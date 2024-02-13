import {Component, OnInit} from '@angular/core';
import {AdminDashboardComponent} from "../admin-dashboard/admin-dashboard.component";
import {LoginService} from "../../../../services/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  title: string = "Admin Dashboard";

  // public loggedIn: boolean = false;

    searchKey: string = '';

  constructor(private adminDashboardComponent: AdminDashboardComponent,
              private loginService : LoginService) {
  }

    ngOnInit(): void {
      // this.loggedIn = this.loginService.isLoggedIn()
    }
    searchUserMethod(): void {
        this.adminDashboardComponent.searchUsers(this.searchKey);
    }

  logoutAdmin(){
      this.loginService.logout();
      location.reload();

  }


}
