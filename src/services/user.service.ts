import { Injectable } from '@angular/core';

@Injectable()
export class userService {

  constructor() {
  }

  saveUser(user){
    localStorage.setItem('PhotoViewUser', user);
  }

  removeUser(){
    localStorage.removeItem('PhotoViewUser');
  }
}
