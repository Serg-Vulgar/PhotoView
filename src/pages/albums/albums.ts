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
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ngOnInit() {
    this.getAlbums();
    this.userName = this.API.userAlias;
  }

  getAlbums(){
    this.showLoading();
    this.API.getAlbums()
      .subscribe((res) => {
        console.log(res);
        this.albums = res.data;
        // console.log('Albums', this.albums);
        this.hideLoading();
      })
  }

  openAlbum(album) {
    this.navCtrl.push(AlbumPage, {
      album: album
    });
  }

  showLoading() {
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

}
