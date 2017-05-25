import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { APIService } from '../../services/API.service';

import { AlbumPage } from '../album/album';

@Component({
  selector: 'page-albums',
  templateUrl: 'albums.html'
})
export class AlbumsPage implements OnInit {
  albums: Array<Object>;

  constructor(private navCtrl: NavController,
              private API: APIService) {

  }

  ngOnInit() {
    this.getAlbums();
  }

  getAlbums() {
    let params = {
      show_private: true,
      image_limit: 1
    };
    this.API.getAlbums(params)
      .subscribe((res) => {
        this.albums = res.result.albums;
        console.log('Albums', this.albums);
      })
  }

  openAlbum(album) {
    this.navCtrl.push(AlbumPage, {
      album: album
    });
  }

}
