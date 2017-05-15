import {Injectable} from '@angular/core';
import {Observer, Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import {Router} from "@angular/router";

@Injectable()
export class LoginMessageService {
    loginStatus$: Observable<any>;
    loginObserver: Observer<any>;
    static to: string = '';

    constructor(private router: Router) {
        this.loginStatus$ = new Observable(observer => this.loginObserver = observer).share();
        this.loginStatus$.subscribe(data=> {

        });

    }

    loginService() {
        return this.loginStatus$;
    }

    showLogin() {
        this.loginObserver.next({
            loged: false,
            message: 'show'
        })
        ;
    }

    hideLogin() {
        this.loginObserver.next({
            loged: false,
            message: 'hide'
        })
        ;
    }

    loginIn() {

        this.loginObserver.next({
            loged: true,
            message: 'hide'
        });

        this.router.navigate([LoginMessageService.to]);
        LoginMessageService.to = '';
    }

    loginOut() {
        this.loginObserver.next({
            loged: false,
            message: 'hide'
        });
    }


}
