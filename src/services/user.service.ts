import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() {
  }

  checkUser(){
    let user = localStorage.getItem('PhotoViewUser');
    if(user) {
      console.log('user available')
    }
  }

  saveUser(user){
    console.log(user);
    localStorage.setItem('PhotoViewUser', user);
  }

  removeUser(){
    localStorage.removeItem('PhotoViewUser');
  }
}
