import {
    Component,
    OnInit,
    ElementRef,
    ViewChild
}      from '@angular/core';

@Component({
    selector: 'slider-component',
    moduleId: module.id,
    templateUrl: 'slider.component.html'
})

/**
 * TODO:
 */
export class SliderComponent implements OnInit {


    visible: number = 1;
    @ViewChild('tpl') tpl;
    timer: any;

    constructor() {
    }


    ngOnInit() {
        this.timer = setInterval(() => {
            this.visible = this.visible == 4 ? 1 : this.visible + 1;
        }, 1000);
    }

    interval() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.visible = this.visible == 4 ? 1 : this.visible + 1;
        }, 1000);
    }


}
