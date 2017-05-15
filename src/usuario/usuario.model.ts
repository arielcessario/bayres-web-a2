import {DatabaseService} from '../providers/database.provider';
import {DatabaseConnectorProvider} from '../providers/database-connector.provider';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject} from "rxjs/Rx";

export class Usuario extends DatabaseService {
    public form: FormGroup;
    private fb: FormBuilder;
    submitted = false;
    public usuario_id: number;
    public mail: string;
    public nombre: string;
    public apellido: string;
    public password: string;
    public calle: string;
    public nro: number;
    public provincia_id: number;
    public telefono: string;
    public fecha_nacimiento: string;
    public news_letter: string;


    static cache: BehaviorSubject<any> = new BehaviorSubject({});


    constructor(private db: DatabaseConnectorProvider) {
        super(db);
    }

    init() {
        // this.get({'function': 'getUsuarios'}).subscribe(data=> {
        //     Usuario.cache.next(data);
        // })
    }

    buildForm(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        this.form = form;
        this.form = this.fb.group({
            'usuario_id': [this.usuario_id],
            'mail': [this.mail, [Validators.required, Validators.email]],
            'nombre': [this.nombre, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
            'apellido': [this.apellido],
            'password': [this.password, [Validators.required, Validators.minLength(3)]],
            'calle': [this.calle],
            'nro': [this.nro],
            'provincia_id': this.provincia_id,
            'telefono': this.telefono,
            'fecha_nacimiento': this.fecha_nacimiento,
            'news_letter': this.news_letter
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }

    public getUsuario() {
        // return Usuario.cache;
    }

    public onSubmit(form: any, create?: boolean) {

        // var ret={};
        if (create) {
            var ret = this.update(form, 'create', 'usuario');
        } else {
            var ret = this.update(form, 'update', 'usuario');
        }

        ret.subscribe(response=> {

            console.log(response);

            if (response['status'] == '200') {
                let currentUser = JSON.parse(localStorage.getItem('currentUser'));

                if (currentUser == null) {
                    // localStorage.setItem('currentUser',
                    //     JSON.stringify({'token': '', 'user': this.parseForm(form).obj}));
                } else {

                    let newCurrentUser = JSON.stringify({'token': currentUser.token, 'user': this.parseForm(form).obj});
                    localStorage.setItem('currentUser', newCurrentUser);
                }


            }
        });

        return ret;
    }

    formErrors = {
        'mail': '',
        'nombre': '',
        'password': '',
        'calle': '',
        'nro': ''
    };
    validationMessages = {
        'nombre': {
            'required': 'Requerido',
            'minlength': 'Mínimo 3 letras',
            'maxlength': 'El nombre no puede tener mas de 24 letras'
        },
        'mail': {
            'required': 'Power is required.',
            'maxlength': 'Sismbolo tiene que tener un máximo de 3 letras'
        },
        'password': {
            'required': 'Debe ingresar un password',
            'minlength': 'El password debe tener al menos tres letras y/o números',
        },
        'calle': {
            'required': 'Debe ingresar un password',
            'minlength': 'El password debe tener al menos tres letras y/o números',
        },
        'nro': {
            'required': 'Debe ingresar un password',
            'minlength': 'El password debe tener al menos tres letras y/o números',
        }
    };
}
