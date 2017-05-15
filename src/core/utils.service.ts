import {Injectable} from '@angular/core';
import {Observable, Observer} from "rxjs/Rx";

@Injectable()
export class UtilsService {
    notification$: Observable<any>;
    private observer: Observer<any>;

    constructor() {
// Observer para que cuando se actualicen algunas cosas, se pueda ver el cambio desde la clase que hereda.
        this.notification$ = new Observable(observer => this.observer = observer).share();
    }






}


