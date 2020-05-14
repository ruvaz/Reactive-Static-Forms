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
    email: 'ruvaz@mail.com'
  };

  constructor(private paisService: PaisService) {

  }

  ngOnInit(): void {

    this.paisService.getpaises()
      .subscribe(paises => {
        console.log(paises);
      });
  }

  guardar(forma: NgForm) {
    if (forma.invalid) {

      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });

      return;

    } else {
      //  console.log(forma.value);
    }
  }

}
