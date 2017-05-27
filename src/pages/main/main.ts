import { Component } from '@angular/core';
import { AlbumsPage } from '../albums/albums';
import { UploadPage } from '../upload/upload';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  tab1: any;
  tab2: any;

  constructor() {
    this.tab1 = AlbumsPage;
    this.tab2 = UploadPage;
  }

}
