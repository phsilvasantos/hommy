import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiURL: string = 'http://localhost:8000/api/';

  constructor(public http: HttpClient) { }

  //CRIAR UMA RELAÇÃO DE FAVORITOS
	public createFavorite(id_republic: any, id_user: any): Observable<any>{
    return this.http.post(this.apiURL + 'createFavorite/' + id_republic + '/' + id_user, {republic_id: id_republic, user_id: id_user});
  }

}