import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
}      from '@angular/core';

@Component({
    selector: 'carrousel-component',
    moduleId: module.id,
    templateUrl: 'carrousel.component.html'
})

/**
 * TODO:
 */
export class CarrouselComponent implements OnInit, AfterViewInit {
    @Input() data: Array<any>;
    @ViewChild('tpl') tpl;

    constructor() {
    }


    ngOnInit() {

    }

    ngAfterViewInit() {
        var _el = document.getElementById('carrousel-items');
    }

    left() {
        var _el = document.getElementById('carrousel-items');
        _el.scrollLeft = _el.scrollLeft - 150;
    }

    right() {
        var _el = document.getElementById('carrousel-items');
        _el.scrollLeft = _el.scrollLeft + 150;

    }


}
