import {Injectable} from "@angular/core";

@Injectable()
export class CacheService {
    static cache: any = {};

    constructor() {

    }

    get(obj: string) {
        return CacheService.cache[obj];
    }

    set(obj: string, data: Array<any>) {
        CacheService.cache[obj] = data;
    }

}

