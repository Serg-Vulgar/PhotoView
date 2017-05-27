import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MainPage } from '../main/main';
import { APIService } from '../../services/API.service';
import { UserService } from '../../services/user.service';

import { OAuth } from 'oauthio-web';

@Component({
  selector: 'auth',
  templateUrl: 'auth.html'
})

export class AuthPage {

  constructor(public navCtrl: NavController,
              private API: APIService,
              private userService: UserService) {
  }


  openAlbums() {
    let that = this;
    let accessToken;
    let userAlias;
    OAuth.initialize('U3IeFTm4pPlPEH7MEUtCRqC9UpE');
    OAuth.popup('imgur')
      .done(function (result) {
        accessToken = result.access_token;
        result.me()
          .done(function (data) {
            userAlias = data.alias;
            that.API['accessToken'] = accessToken;
            that.API['userAlias'] = userAlias;
            let user = {
              'accessToken': accessToken,
              'userAlias': userAlias
            };
            that.userService.saveUser(JSON.stringify(user));
            that.navCtrl.push(MainPage);
          })
      });
  }
}
