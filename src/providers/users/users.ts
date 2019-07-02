import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersProvider {
  private API_URL = 'https://reqres.in/api/'

  constructor(public http: Http) { }

  getAll(page: number, lista = false, id = 0) {
    return new Promise((resolve, reject) => {
      let url;
      
/*      if (lista){
        url = this.API_URL + 'users/?per_page=10&page=' + page;
      } else {
        url = this.API_URL + 'users/' + id;
      } */

      //essa verificação é igual à de cima
      url = lista ? this.API_URL + 'users/?per_page=8&page=' + page : 
                    this.API_URL + 'users/' + id;

      this.http.get(url)
        .subscribe((result: any) => {
          console.log(result)
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          });
    });
  }
}
