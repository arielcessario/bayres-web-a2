import {
    Component,
    OnInit,
    ElementRef,
    ViewChild, Input, AfterViewInit
}      from '@angular/core';

@Component({
    selector: 'producto-component',
    moduleId: module.id,
    templateUrl: 'producto.component.html'
})

/**
 * TODO:
 */
export class ProductoComponent implements OnInit {

    constructor() {
        console.log('hola');
    }


    ngOnInit() {

    }



}
