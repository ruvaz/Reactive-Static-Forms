import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {


  constructor(private http: HttpClient) {
  }


  getpaises() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .pipe(
        map((resp: any[]) =>
          resp.map(
            pais => ({nombre: pais.name, codigo: pais.alpha3Code})
          )
        ));
  // mas larga .
    // pipe(
    //   map((resp: any[]) => {
    //     return resp.map(pais => {
    //       return {
    //         nombre: pais.name,
    //         codigo: pais.alpha3Code
    //       };
    //     });
    //   })
    // );
  }

}
