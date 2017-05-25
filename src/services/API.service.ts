import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { userService } from './user.service';

@Injectable()
export class APIService {
  apiUrl = 'https://api.imageshack.com/v2/';

  // user: Object;

  user = {
    name: 'traziusbiz',
    password: 'Vulgar666'
  };

  constructor(public http: Http, private userService: userService) {
  }

  getHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    return new RequestOptions({headers: headers});
  }

// login user
  login(user): Observable<any> {

    let requestOptions = new RequestOptions();
    requestOptions.params = user;

    return this.http.get(this.apiUrl + 'user/login', requestOptions)
      .map((response: Response) => {
        let res = response.json();

        // this.user = {
        //   name: res.result.username,
        //   auth_token: res.result.auth_token
        // };

        this.userService.saveUser(this.user);
      });
  }

//get user albums
  getAlbums(params) {
    let requestOptions = new RequestOptions();
    requestOptions.params = params;
    return this.http.get(this.apiUrl + 'user/' + this.user['name'] + '/albums', requestOptions)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAlbum(albumId) {
    console.log(albumId);
    return this.http.get(this.apiUrl + 'albums/' + albumId)
      .map((response: Response) => {
        return response.json();
      });
  }

//
// extractData(res: Response) {
//   console.log(res.json());
// }
//
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
