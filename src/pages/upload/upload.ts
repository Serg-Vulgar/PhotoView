import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { APIService } from '../../services/API.service';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage implements OnInit {

  constructor(private navCtrl: NavController,
              private API: APIService) {

  }

  ngOnInit() {
    // this.getAlbums()
  }

}
