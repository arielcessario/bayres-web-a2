import {DatabaseService} from '../../providers/database.provider';
import {DatabaseConnectorProvider} from '../../providers/database-connector.provider';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

export class Login extends DatabaseService {
    public form: FormGroup;
    private fb: FormBuilder;
    submitted = false;
    public mail: String;
    public password: String;



    constructor(private db: DatabaseConnectorProvider) {

        super(db);
    }

    buildForm(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        this.form = form;
        this.form = this.fb.group({
            'mail': [this.mail, [Validators.required, Validators.email]],
            'password': [this.password, [
                Validators.required,
                Validators.minLength(1)
            ]
            ]
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }


    formErrors = {
        'mail': '',
        'password': ''
    };
    validationMessages = {
        'mail': {
            'required': 'Debe ingresar su cuenta de mail',
            'email': 'El mail ingresado es incorrecto'
        },
        'password': {
            'required': 'Debe ingresar un password',
            'minlength': 'El password tener al menos 8 caracteres'
        }
    };
}
