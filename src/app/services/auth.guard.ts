import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {LoginService} from "./login.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const loginService = inject(LoginService);
    const router = inject(Router);

    if (loginService.isLoggedIn()){
        return true;
    }
    router.navigateByUrl("/login")
    return false;


    // if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== " "
    //     && loginService.isLoggedIn()
    // ) {
    //     return true;
    // }
    // router.navigateByUrl("home");
    // return false;
}
