import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginMessageService} from "../shared/login/login-message.service";

@Injectable()
export class AuthGuard implements CanActivate {
    static to: string = '';

    constructor(private router: Router, private loginMessageService: LoginMessageService) {

    }

    canActivate() {
        // console.log(this.router);
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        // this.router.navigate(['/login']);

        this.loginMessageService.showLogin();
        return false;
    }
}

