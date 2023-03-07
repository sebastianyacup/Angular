import { Component } from '@angular/core';
import { Egreso } from './egreso/egreso.model';
import { EgresoServicio } from './egreso/egreso.servicio';
import { Ingreso } from './ingreso/ingreso.model';
import { IngresoServicio } from './ingreso/ingreso.servicio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ingresos:Ingreso[] = [] ;
  egresos: Egreso[] =[];

  constructor(private ingresoServicio: IngresoServicio,  private egresoservicio: EgresoServicio){
    this.ingresos = ingresoServicio.ingresos;
    this.egresos = egresoservicio.egresos;
  }
  getIngresoTotal(){
    let ingresoTotal:number=0;
    this.ingresos.forEach(ingreso => {
      ingresoTotal += ingreso.valor ;
    }
    );
    return ingresoTotal;
  }

  getEgresoTotal(){
    let EgresoTotal: number = 0;
    this.egresos.forEach(egresos => {
      EgresoTotal += egresos.valor;
    }
    );
    return EgresoTotal;
  }
  
  getPorcentajeTotal(){
    return this.getEgresoTotal() / this.getIngresoTotal();
  }

  getPresupuestoTotal(){
    return this.getIngresoTotal() - this.getEgresoTotal();
  }

}
