// Snapshot version
// #docregion
import {Component, OnInit, Input, Output, EventEmitter}      from '@angular/core';
import {PaginationService} from './pagination.service';
import {FormControl} from "@angular/forms";


@Component({
    selector: 'pagination-component',
    moduleId: module.id,
    templateUrl: 'pagination.component.html'
})
export class PaginationComponent implements OnInit {
    // hero: Hero;
    private start: number;
    private limit: number = 0;
    private pages: number;
    private page: number = 1;
    pageNav: FormControl;

    @Output('paginado')
    change: EventEmitter<number> = new EventEmitter<number>();


    routes: string[];


    constructor(private paginationService: PaginationService) {
        this.paginationService.get().subscribe(data=> {
            this.limit = data.data.limit;
            this.start = data.data.begin;
            this.pages = data.data.pages;
        });
    }

    prev() {
        if (this.page >= 2) {
            this.page--;
            this.start = this.start - this.limit;
            this.pageNav.setValue(this.page);
            this.change.emit(this.start);
        } else {
            return;
        }
    }

    next() {

        if (this.page < this.pages) {
            this.page++;
            this.start = this.start + this.limit;
            this.pageNav.setValue(this.page);
            this.change.emit(this.start);
        } else {
            return;
        }

    }

    goTo(page) {

        if (page == '' || page == null || page == undefined) {
            return;
        }
        this.page = page;

        if (this.page < 1) {
            this.page = 1;
            this.pageNav.setValue(this.page);
        }

        if (this.page > this.pages) {
            this.page = this.pages;
            this.pageNav.setValue(this.page);
        }

        this.change.emit((this.page - 1) * this.limit);
    }

    ngOnInit() {
        this.pageNav = new FormControl(1);

        this.pageNav.valueChanges.subscribe(value => {
            this.goTo(value);
            // do something with value here
        });
    }

}
