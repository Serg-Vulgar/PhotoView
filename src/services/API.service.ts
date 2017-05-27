import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class APIService {
  apiUrl = 'https://api.imgur.com/3/account/';
  accessToken;
  userAlias;
  imageUploaded: boolean = false;

  constructor(public http: Http) {
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return new RequestOptions({headers: headers});
  }

  getAlbums() {
    return this.http.get(this.apiUrl + this.userAlias + '/albums', this.getHeaders())
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getAlbum(albumId) {
    return this.http.get(this.apiUrl + this.userAlias + '/album/' + albumId, this.getHeaders())
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
