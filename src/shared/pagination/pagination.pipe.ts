import {Pipe, PipeTransform} from '@angular/core';
import {PaginationService} from './pagination.service';

@Pipe({name: 'paginado', pure: true})
export class PaginationPipe implements PipeTransform {
    private ret: Array<any> = [];
    private begin: number = 0;
    private pages: number = 0;

    constructor(private paginationService: PaginationService) {

    }

    transform(value: any, limit: any, begin: any): any {
        if (value == null) {
            return value;
        }
        this.pages = Math.ceil(value.length / limit);

        this.paginationService.set({limit: limit, begin: begin, length: value.length, pages: this.pages});

        this.begin = begin;

        if (Math.abs(Number(limit)) === Infinity) {
            limit = Number(limit);
        } else {
            limit = parseInt(limit);
        }
        if (isNaN(limit)) return value;

        if (Number(value)) value = value.toString();
        if (!Array(value) && !String(value)) return value;

        this.begin = (!this.begin || isNaN(this.begin)) ? 0 : Number(this.begin);
        this.begin = (this.begin < 0) ? Math.max(0, value.length + this.begin) : this.begin;

        if (limit >= 0) {
            this.ret = value.slice(this.begin, this.begin + limit);
        } else {
            if (this.begin === 0) {
                this.ret = value.slice(limit, value.length);
            } else {
                this.ret = value.slice(Math.max(0, this.begin + limit), this.begin);
            }
        }

        // this.paginationService.get().subscribe(data=> {
        //     console.log(data);
        //     //
        // });

        return this.ret;


        // Retorno un observable
        // return new Observable<Array<any>>((observer: Subscriber<Array<any>>) => {
        //     observer.next(this.ret);
        // });

    }



}
