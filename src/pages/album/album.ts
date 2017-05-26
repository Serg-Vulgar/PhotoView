import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../services/API.service';

import { ImagePage } from '../image/image';

@Component({
  selector: 'page-album',
  templateUrl: 'album.html'
})
export class AlbumPage implements OnInit {
  images: Array<Object>;
  album: Object;

  constructor(private navCtrl: NavController,
              public params: NavParams,
              private API: APIService) {

  }

  ngOnInit() {
    this.album = this.params.data['album'];
    console.log(this.album);
    this.getAlbum(this.album['id'])
  }

  getAlbum(albumId) {
    this.API.getAlbum(albumId)
      .subscribe((res) => {
        this.images = res.data.images;
        console.log(this.images);
      })
  }

  showTooltip(image) {
  }

  openImage(image) {
    this.navCtrl.push(ImagePage, {
      image: image
    });
  }


  goBack() {
    this.navCtrl.pop();
  }
}
