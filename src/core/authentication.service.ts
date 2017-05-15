import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observer, Observable, Subject, BehaviorSubject} from "rxjs/Rx";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {

        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});


        return this.http.post('http://localhost/bayres-web-a2/server/ac-usuarios.php', JSON.stringify({
            mail: username,
            password: password,
            'function': 'login',
            sucursal_id: -2
        }), options)
            .map((response: Response) => {

                console.log(response);
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let user = response.json() && response.json().user;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({user: user, token: token}));

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((err: Response, caught: Observable<any>)=>{
                console.log(err);
                return Observable.throw(err);
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
