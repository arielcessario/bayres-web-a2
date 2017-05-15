import {Observer, Observable} from "rxjs/Rx";
import {OnInit, Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {CacheService} from '../core/services/cache.service'
import {ObservableInput} from "rxjs/Observable";
import {AuthenticationService} from "../core/authentication.service";

@Injectable()
export class DatabaseConnectorProvider implements OnInit {

    static cache: CacheService;
    static obj: string = '';


    static status$: Observable<any>;
    static list: any = {};
    static observer: Observer<any>;

    private urls: any = {
        usuario: 'http://localhost/bayres-web-a2/server/ac-usuarios.php',
        sucursal: 'http://localhost/bayres-web-a2/server/ac-sucursales.php',
        producto: 'http://localhost/bayres-web-a2/server/ac-productos.php'
    };

    constructor(private http: Http, private authenticationService: AuthenticationService) {
        DatabaseConnectorProvider.cache = new CacheService();
    }

    ngOnInit() {

    }

    public get(url, obj) {

        let token = '';
        if(localStorage.getItem('currentUser')){
            token = (JSON.parse(localStorage.getItem('currentUser')).token);
        }


        // add authorization header with jwt token
        let headers = new Headers({'Authorization': 'Bearer ' + token});
        let options = new RequestOptions({headers: headers});

        DatabaseConnectorProvider.obj = obj;

        var response = this.http.get(url, options).share();

        return response
            .map(this.extractData)
            .catch(this.handleError);
    }

    public extractData(data: Response) {
        // console.log(data['_body']);

        if (data['_body'] != '') {
            let body = data.json();
            DatabaseConnectorProvider.cache.set(DatabaseConnectorProvider.obj, body);
            return body || {};
        } else {
            return {}
        }
    }

    private handleError(error: Response | any) {

        console.log(error);
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    public set(cache: Array<any>) {
        // DatabaseConnectorProvider.cache = cache;
    }

    public status() {
        return DatabaseConnectorProvider.status$;
    }

    public create(params: any, url: string) {


        let token = '';
        if(localStorage.getItem('currentUser')){
            token = (JSON.parse(localStorage.getItem('currentUser')).token);
        }

        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
        let options = new RequestOptions({headers: headers});

        let ret = this.http.post(this.urls[url], JSON.stringify(params), options)
            .map((response: Response) => {
                return response;
            })
            .catch(this.handleError)
            .share();

        return ret;
    }

    // public update(obj: any, table: string) {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer ' + this.authenticationService.token
    //     });
    //     let options = new RequestOptions({headers: headers});
    //
    //     let ret = this.http.post(this.urls[url], JSON.stringify(params), options)
    //         .map((response: Response) => {
    //             console.log(response);
    //         }).share();
    //
    //     ret.subscribe(data=> {
    //         console.log(data);
    //     });
    //
    // }

    public delete(obj: any, table: string) {

    }


    public any(params: any, table: string, method: string) {

    }
}