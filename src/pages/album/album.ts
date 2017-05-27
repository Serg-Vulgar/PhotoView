import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { APIService } from '../../services/API.service';

import { ImagePage } from '../image/image';

@Component({
  selector: 'page-album',
  templateUrl: 'album.html'
})
export class AlbumPage implements OnInit {
  allImages: Array<Object>;
  images: Array<Object>;
  imageLastIndex: number;
  album: Object;
  loading;

  constructor(private navCtrl: NavController,
              public params: NavParams,
              private loadingCtrl: LoadingController,
              private API: APIService) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  ngOnInit() {
    this.album = this.params.data['album'];
    this.getAlbum(this.album['id'])
  }

  getAlbum(albumId) {
    this.showLoading();
    this.API.getAlbum(albumId)
      .subscribe((res) => {
        this.allImages = res.data.images;
        this.images = this.getImages(0, 9);
        this.hideLoading();
      })
  }

  openImage(image) {
    this.navCtrl.push(ImagePage, {
      image: image
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  showLoading() {
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  getImages(firstIndex, lastIndex) {
    this.imageLastIndex = lastIndex + 1;
    return this.allImages.filter((image, index) => {
      if (index >= firstIndex && index <= lastIndex) return image;
    });
  }

  showMoreImages(infiniteScroll) {
    setTimeout(() => {
      let newImages = this.getImages(this.imageLastIndex, this.imageLastIndex + 9);
      this.images.push(...newImages);
      infiniteScroll.complete();
    }, 300)
  }

}
