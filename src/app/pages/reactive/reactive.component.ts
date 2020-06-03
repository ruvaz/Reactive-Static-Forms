import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  constructor(private fb: FormBuilder) {

    this.crearFormulario();
    // despues de crear el formulario
    this.cargarDataAlFormulario();

  }

  ngOnInit(): void {
  }


  crearFormulario() {
    console.log('crear forma');

    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido: ['', [Validators.required, Validators.minLength(5)]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required],
      }),
      pasatiempos: this.fb.array([])
    });

  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  agregarPasatiempo() {
    console.log('se agrego input');
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {

    this.pasatiempos.removeAt(i);
  }

  cargarDataAlFormulario() {
    this.forma.reset({
        nombre: 'Juan ',
        apellido: 'Peres',
        correo: 'correo@gmail.com',
        direccion: {
          distrito: 'Otaho',
          ciudad: 'Otawa'
        }
      }
    );

    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));


  }


  guardarForma() {
    console.log(this.forma);

    // validar forma
    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => {
            control.markAsTouched();
          });
        } else {
          control.markAsTouched();
        }
      });

    } else {
      console.log('Guardando...');
      console.log(this.forma.value);
    }


    // posteo de informacion + reset del formulario.
    // borra todo el estdo del formulario
    // this.forma.reset({
    //   nombre:''
    // });
    this.forma.reset({
        nombre: 'Juan ',
        apellido: 'Peres',
        correo: 'correo@gmail.com'
        // direccion: {
        //   distrito: 'Otaho',
        //   ciudad: 'Otawa'
        // }
      }
    );

  }

  // getter para procesar informacion  no recibe parametros
  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }

  get correoNoValido() {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValida() {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
}
