import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { MyApp } from './app.component';

import { MainPage } from '../pages/main/main';
import { UploadPage } from '../pages/upload/upload';
import { AlbumsPage } from '../pages/albums/albums';
import { AlbumPage } from '../pages/album/album';
import { ImagePage } from '../pages/image/image';
import { AuthPage } from '../pages/auth/auth';

import { APIService } from '../services/API.service';
import { UserService } from '../services/user.service';


@NgModule({
  declarations: [
    MyApp,
    AuthPage,
    AlbumsPage,
    AlbumPage,
    ImagePage,
    MainPage,
    UploadPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
    }),
    DropzoneModule.forRoot(),
    HttpModule,
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AuthPage,
    AlbumsPage,
    AlbumPage,
    ImagePage,
    MainPage,
    UploadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    APIService,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {
}
