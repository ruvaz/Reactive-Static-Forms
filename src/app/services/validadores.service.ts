import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

// se crea una interfaz para el tipo de retorno de el promise, que pueden ser varias string que devuelven boolean
interface ErrorValidate {
  [s: string]: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() {
  }

  // validacion asincrona
  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    // valida que no sea un campo vacio
    if (!control.value) {
      return Promise.resolve(null);
    }

    // valida que sea una cadena valida
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'ruben') {
          resolve({existe: true});
        } else {
          resolve(null);
        }
      }, 3500);
    });
  }


  // retorna objeto que tiene una cadena y un valor boolean
  noHerrera(control: FormControl): ErrorValidate {
    // si encuentra un herrera
    if (control.value?.toLowerCase() === 'herrera') {
      return {
        noHerrera: true
      };
    }
    // si no hubo herrera retorna null
    return null;
  }

  // validacion personalizada para validar 2 passwds
  passwordsIguales(pass1Name: string, pass2Name: string) {
    // recibimos un form
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({noEsIgual: true});
      }
    };
  }


}
