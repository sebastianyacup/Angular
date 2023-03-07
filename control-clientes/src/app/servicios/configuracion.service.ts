import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Configuracion } from "../modelo/configuracion.model";

@Injectable()

export class ConfiguracionServicio{
    configuracionDoc!: AngularFirestoreDocument<Configuracion>;
    configuracion!:Observable<Configuracion>;

    //id único de la colección de configuración
    id= '1';

    constructor(private db: AngularFirestore){}

    getConfiguracion(): Observable<Configuracion>{
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges({ idField: 'id' }).pipe(
            map((data:any) => {
                const id = data.id;
                const datos = data as Configuracion;
                return { id, ...datos };
            })
        );
        return this.configuracion;
    }

    modificarConfiguracion(configuracion: Configuracion){
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }
}
