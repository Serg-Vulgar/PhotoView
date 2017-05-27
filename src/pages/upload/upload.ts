import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/API.service';
import { LoadingController } from 'ionic-angular';

import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html'
})
export class UploadPage implements OnInit {
  albums: Array<Object>;
  targetAlbum;
  loading;

  dropzoneConfig: DropzoneConfigInterface;

  constructor(private API: APIService,
              private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ngOnInit() {
    let that = this;
    this.getAlbums();
    this.dropzoneConfig = {
      url: 'https://api.imgur.com/3/image',
      paramName: 'image',
      acceptedFiles: 'image/jpeg, images/jpg, image/png',
      method: 'post',
      maxFilesize: 5,
      headers: {
        'Cache-Control': null,
        'X-Requested-With': null,
        'Authorization': 'Bearer ' + this.API.accessToken
      },
      autoReset: null,
      init: function () {
        this.on('complete', () => {
          that.API.imageUploaded = true;
        });
      }
    };

  }

  ionViewWillEnter() {
    this.API.imageUploaded = false;
    this.resetDropzone();
    this.targetAlbum = null;
  }


  getAlbums() {
    this.showLoading();
    this.API.getAlbums()
      .subscribe((res) => {
        this.albums = res.data;
        this.hideLoading();
      })
  }

  showLoading() {
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  changeTargetAlbum(e: Event) {
    this.dropzoneConfig.url = 'https://api.imgur.com/3/image?album=' + this.targetAlbum;
    this.resetDropzone();
  }

  resetDropzone() {
    this.dropzoneConfig.autoReset = 1;
    setTimeout(() => {
      this.dropzoneConfig.autoReset = null;
    }, 100);
  }

}
