import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import { UserService } from './user.service';

@Injectable()
export class APIService {
  apiUrl = 'https://api.imgur.com/3/account/';
  accessToken;
  userAlias;

  constructor(public http: Http) {
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + this.accessToken);
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return new RequestOptions({headers: headers});
  }

// login user
//   login(user): Observable<any> {
//     let requestOptions = new RequestOptions();
//     requestOptions.params = user;
//
//     return this.http.post(this.apiUrl + 'user/login?' + this.apiKey + '&auth_token=7f42c0264e726513a4a66a880f6c57a0', requestOptions, this.getHeaders())
//       .map((response: Response) => {
//         let res = response.json();
//
//         // this.user = {
//         //   name: res.result.username,
//         //   auth_token: res.result.auth_token
//         // };
//
//         this.userService.saveUser(this.user);
//       });
//   }

  getAlbums() {
    return this.http.get(this.apiUrl + this.userAlias + '/albums', this.getHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

  getAlbum(albumId) {
    return this.http.get(this.apiUrl + this.userAlias + '/album/' + albumId, this.getHeaders())
      .map((response: Response) => {
        return response.json();
      });
  }

// private handleError(error: Response | any) {
//   // In a real world app, you might use a remote logging infrastructure
//   let errMsg: string;
//   if (error instanceof Response) {
//     const body = error.json() || '';
//     const err = body.error || JSON.stringify(body);
//     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
//   } else {
//     errMsg = error.message ? error.message : error.toString();
//   }
//   console.error(errMsg);
//   return Observable.throw(errMsg);
// }
}
