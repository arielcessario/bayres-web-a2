import {Observer, Observable} from "rxjs/Rx";
import {OnInit} from "@angular/core";
export class FireCacheProvider implements OnInit {
    static cache: Array<any>;


    static status$: Observable<any>;
    static list: any = {};
    static observer: Observer<any>;

    constructor() {
        if (FireCacheProvider.status$ == undefined) {
            FireCacheProvider.status$ = new Observable(observer => {
                FireCacheProvider.observer = observer
            }).share();

            // Sin esto no se subscribe?
            FireCacheProvider.status$.subscribe(data=>{
            });
        }


        if (FireCacheProvider.cache == undefined) {
            FireCacheProvider.cache = [];
        }

    }

    ngOnInit() {

    }

    public get(cache?: string) {
        if (cache != undefined) {

            FireCacheProvider.list[cache] = true;
            if (FireCacheProvider.observer != undefined) {
                FireCacheProvider.observer.next({
                    data: {action: 'working'}
                });
            }


            let subs = FireCacheProvider.cache[cache].subscribe(data=> {
                delete FireCacheProvider.list[cache];
                if (FireCacheProvider.observer != undefined) {
                    if (Object.getOwnPropertyNames(FireCacheProvider.list).length == 0) {
                        FireCacheProvider.observer.next({
                            data: {action: 'free'}
                        });
                    }
                }

                subs.unsubscribe();
            });
            return FireCacheProvider.cache[cache];
        } else {
            return FireCacheProvider.cache;
        }
    }

    public set(cache: Array<any>) {
        FireCacheProvider.cache = cache;
    }

    public status() {
        return FireCacheProvider.status$;
    }
}