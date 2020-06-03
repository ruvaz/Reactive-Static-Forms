import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() {
  }

  // retorna objeto que tiene una cadena y un valor boolean
  noHerrera(control: FormControl): { [s: string]: boolean } {
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
  };


}
