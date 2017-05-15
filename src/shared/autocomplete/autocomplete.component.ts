import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    HostListener, ElementRef, AfterContentInit, ViewChild, AfterViewInit, Renderer
}      from '@angular/core';
import {DatabaseService} from "../../providers/database.provider";
import {NgControl} from "@angular/forms";

@Component({
    selector: '[ac-autocomplete]',
    moduleId: module.id,
    templateUrl: 'autocomplete.component.html'
})

/**
 * TODO:
 * 1 - Selected Id se puede obtener en forma automática?
 */
export class AutocompleteComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit {
    @Input() autocompleteData: DatabaseService;
    @Input() autocompleteToShow: Array<any>;
    @Input() autocompleteToSelect: string;
    @Input() autocompleteSearchBy: Array<any>;

    response: Array<any> = [];
    private visible: boolean = true;
    private alreadySelected: boolean = false;
    private focused: boolean = true;

    private selected: any = {};
    private indexSelected: number = 0;

    @Output('selectedId')
    selectedId: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('tpl') tpl;

    constructor(private _el: ElementRef, private control: NgControl, public renderer: Renderer) {
    }

    ngAfterViewInit() {
        // console.log(this._el.nativeElement.getBoundingClientRect());
        // console.log(this.tpl.nativeElement);
    }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this._el.nativeElement.parentNode.appendChild(this.tpl.nativeElement);
        this.renderer.setElementStyle(this.tpl.nativeElement, 'margin-top', (this._el.nativeElement.offsetTop + this._el.nativeElement.getBoundingClientRect().height + 3 ) + 'px');

    }

    @HostListener('keyup', ['$event'])
    filter(event: Event) {
        this.alreadySelected = false;
        this.show(event);
    }

    @HostListener('focus', ['$event'])
    foco(event: Event) {
        this.show(event);
    }

    @HostListener('click', ['$event'])
    click(event: Event) {
        this.alreadySelected = false;
        this.show(event);
    }

    @HostListener('blur', ['$event'])
    leave(event: Event) {
        setTimeout(() => {
            this.focused = false;
            this.determineVisibility();
        }, 100);
    }

    select(index) {
        this.indexSelected = index;
        this.focused = false;
        this.selected = this.response[this.indexSelected];
        this.control.control.setValue(this.selected[this.autocompleteToSelect]);
        this.selectedId.emit(this.selected['$key']);
        this.determineVisibility();
    }

    over(index) {
        this.indexSelected = index;
        this.focused = true;
        this.determineVisibility();

    }

    show(event: Event) {
        this.autocompleteData.filter(this.autocompleteSearchBy, event.target['value'], 'false');

        let subs = this.autocompleteData.filter$.subscribe(data=> {
            this.focused = data.data.length > 0;
            this.response = data.data;
        });
        this.determineVisibility();
    }

    @HostListener('keydown', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        // console.log(event.keyCode);

        // Me muevo para abajo en la lista
        if (event.keyCode == 40) {
            this.indexSelected = +((this.indexSelected >= this.response.length ) ? this.response.length : this.indexSelected + 1);

            let height = this.tpl.nativeElement.querySelector('div').scrollHeight;
            let scrollSection = height / this.response.length;
            this.tpl.nativeElement.querySelector('div').scrollTop = scrollSection * (this.indexSelected - 1);
        }

        // Me muevo para arriba en la lista
        if (event.keyCode == 38) {
            this.indexSelected = +((this.indexSelected <= 1) ? 1 : this.indexSelected - 1);

            let height = this.tpl.nativeElement.querySelector('div').scrollHeight;
            let scrollSection = height / this.response.length;
            this.tpl.nativeElement.querySelector('div').scrollTop = scrollSection * (this.indexSelected - 1);
        }

        // Cuando presiono escape
        if (event.keyCode == 27) {
            this.focused = false;
            this.alreadySelected = true;
        }

        // selecciono
        if (event.keyCode == 13 || event.keyCode == 9) {
            this.focused = false;
            this.alreadySelected = true;
            this.selected = this.response[this.indexSelected - 1];

            this.control.control.setValue(this.selected[this.autocompleteToSelect]);
            this.selectedId.emit(this.selected['$key']);
        }

        this.determineVisibility();
    }


    ngOnChanges(changes: SimpleChanges) {
    }

    determineVisibility() {

        // if (this.focused) {
        this.visible = true;
        // }

        if (!this.focused || this.alreadySelected) {
            this.visible = false;
            return;
        }

        this.tpl.nativeElement.style.top = this._el.nativeElement.style.top;


    }
}
