import {Component, OnInit} from '@angular/core';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {LoginService} from "../../services/login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    faLock = faLock;

    credential: { email: string, password: string } = {
        email: '',
        password: ''
    }

    constructor(private loginService: LoginService, private router: Router) {
    }

    ngOnInit(): void {
    }

    protected readonly onsubmit = onsubmit;

    onSubmit(): void {
        if ((this.credential.email != '' && this.credential.password != '')
            && (this.credential.email != null && this.credential.password != null)
        ) {
            this.loginService.generateToken(this.credential).subscribe({
                    next: (response: any) => {
                        console.log(response)
                        this.loginService.login(response)
                        this.router.navigate(['/home']);
                    },
                    error: error => {
                        console.log(error)
                    }
                }
            )
        } else {
            console.log("Fields are empty")
        }
    }
}
