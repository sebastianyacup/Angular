import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedin!: boolean;
  loggedInUser!: string | null;
  permitirRegistro!: boolean;

  constructor(private LoginService: LoginService , private router: Router, private configuracionServicio: ConfiguracionServicio){}

  ngOnInit(): void {
    this.LoginService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedin = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedin = false;
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe(configuracion =>{
      this.permitirRegistro = configuracion.permitirRegistro ? true: false;
    })
  }

  logout(){
    this.LoginService.logout();
    this.isLoggedin = false;
    this.router.navigate(['/login']);
  }

}
