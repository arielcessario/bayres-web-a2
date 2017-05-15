import {NgModule}       from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule}        from '@angular/forms';

import {filtro} from './filtro.pipe'
import {TitleCasePipe} from './title-case.pipe'
import {AutocompleteComponent} from './autocomplete/autocomplete.component'
import {AutocompleteService} from './autocomplete/autocomplete.service'
import {CarrouselComponent}    from './carrousel/carrousel.component';
import {PaginationComponent}    from './pagination/pagination.component';
import {PaginationPipe}    from './pagination/pagination.pipe';
import {PaginationService}    from './pagination/pagination.service';
import {SliderComponent} from "./slider/slider.component";

import {LoginMessageService} from './login/login-message.service'
import {CarritoService} from './carrito/carrito.service'


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        filtro,
        TitleCasePipe,
        AutocompleteComponent,
        CarrouselComponent,
        PaginationComponent,
        PaginationPipe,
        SliderComponent,
    ],
    exports: [
        filtro,
        TitleCasePipe,
        AutocompleteComponent,
        CarrouselComponent,
        PaginationComponent,
        PaginationPipe,
        SliderComponent,
    ],
    providers: [
        AutocompleteService,
        PaginationService,
        LoginMessageService,
        CarritoService
    ]
})
export class SharedModule {
}