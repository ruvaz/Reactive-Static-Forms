import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {PaisService} from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'ruben',
    apellido: 'vazquez',
    email: 'ruvaz@mail.com',
    pais: 'CRI',
    genero: 'F'
  };

  paises: any[] = [];


  constructor(private paisService: PaisService) {

  }

  ngOnInit(): void {

    // obtener paises de servicio
    this.paisService.getpaises()
      .subscribe(paises => {
        this.paises = paises;
        //  console.log(paises);
        this.paises.unshift({
          nombre: '[seleccione un pais]',
          codigo: ''
        });
      });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log('Form invalido');
      console.log(forma.value);
      return;
    } else {
      console.log('Guardando...');
      console.log(forma.value);
    }
  }

}
