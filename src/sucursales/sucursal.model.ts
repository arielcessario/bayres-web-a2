import {DatabaseService} from '../providers/database.provider';
import {DatabaseConnectorProvider} from '../providers/database-connector.provider';
import {BehaviorSubject} from "rxjs/Rx";

export class Sucursal extends DatabaseService {

    static cache: BehaviorSubject<any> = new BehaviorSubject({});

    constructor(private db: DatabaseConnectorProvider) {
        super(db);
    }

    init() {
        this.get({'function': 'getSucursales'}).subscribe(data=> {
            Sucursal.cache.next(data);
        })
    }

    public getSucursal() {
        return Sucursal.cache;
    }


}
