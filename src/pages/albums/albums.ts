import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { APIService } from '../../services/API.service';

import { AlbumPage } from '../album/album';

@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html'
})
export class AlbumsPage implements OnInit {
  albums: Array<Object>;
  userName;
  loading;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private API: APIService) {
  }

  ngOnInit() {
    this.getAlbums();
    this.userName = this.API.userAlias;
  }

  ionViewDidEnter() {
    if (this.API.imageUploaded) {
      this.getAlbums();
    }
  }

  getAlbums() {
    this.showLoading();
    this.API.getAlbums()
      .subscribe((res) => {
        this.albums = res.data;
        this.hideLoading();
        this.API.imageUploaded = false;
      })
  }

  openAlbum(album) {
    this.navCtrl.push(AlbumPage, {
      album: album
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

}
