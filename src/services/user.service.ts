import { Injectable } from '@angular/core';
import { APIService } from './API.service';

@Injectable()
export class UserService {

  constructor(private API: APIService,) {
  }

  checkUser() {
    let user = localStorage.getItem('PhotoViewUser');
    if (user) {
      let data = JSON.parse(user);
      this.API.accessToken = data['accessToken'];
      this.API.userAlias = data['userAlias'];
      return data['accessToken'];
    }
  }

  saveUser(user) {
    localStorage.setItem('PhotoViewUser', user);
  }

  removeUser() {
    localStorage.removeItem('PhotoViewUser');
  }
}
