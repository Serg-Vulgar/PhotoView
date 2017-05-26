import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, AlertController } from 'ionic-angular';

import { MainPage } from '../main/main';
import { APIService } from '../../services/API.service';
import { UserService } from '../../services/user.service';

import { OAuth } from 'oauthio-web';

@Component({
  selector: 'auth',
  templateUrl: 'auth.html'
})

export class AuthPage implements OnInit {
  loginForm: FormGroup;
  formErrors = {
    'user': '',
    'password': ''
  };
  validationMessages = {
    'user': {
      'required': 'Username required'
    },
    'password': {
      'required': 'Password required'
    }
  };

  constructor(public navCtrl: NavController,
              private API: APIService,
              private fb: FormBuilder,
              private userService: UserService,
              public alertCtrl: AlertController) {
  }

  ngOnInit() {
    // this.createForm();
    this.userService.checkUser();
  }

  // createForm(): void {
  //   this.loginForm = this.fb.group({
  //     user: ['', [Validators.required]],
  //     password: ['', [Validators.required]]
  //   });
  //
  //   this.loginForm.valueChanges
  //     .subscribe((data: any) => this.onValueChange(data));
  // }
  //
  // onValueChange(data?: any) {
  //   let form = this.loginForm;
  //   if (!form) {
  //     return;
  //   }
  //
  //   for (let field in this.formErrors) {
  //     this.formErrors[field] = '';
  //     let control = form.get(field);
  //
  //     if (control && control.dirty && !control.valid) {
  //       let message = this.validationMessages[field];
  //       for (let key in control.errors) {
  //         this.formErrors[field] += message[key] + ' ';
  //       }
  //     }
  //   }
  // }

  // makeFormDirty() {
  //   for (let field in this.formErrors) {
  //     this.loginForm.get(field).markAsDirty();
  //   }
  // }
  //
  // onSubmit(form: FormGroup) {
  //
  //   this.makeFormDirty();
  //   this.onValueChange();
  //
  //   if (form.valid) {
  //     let formData = form.getRawValue();
  //     let data = {
  //       user: formData.user,
  //       password: formData.password
  //     };
  //
  //     console.log(data);
  //     this.API.login(data)
  //       .subscribe(() => {
  //           this.navCtrl.push(MainPage);
  //           form.reset();
  //         },
  //         err => {
  //           console.log(err);
  //           if (err.status) {
  //             let message = err.json().error.error_message;
  //             this.showAlert(message);
  //             form.reset();
  //           } else {
  //             this.showAlert('Some error happens!');
  //           }
  //         })
  //   }
  // }


  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }


  imgur() {
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
