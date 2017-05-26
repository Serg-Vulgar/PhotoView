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
  userName;

  constructor(private navCtrl: NavController,
              private API: APIService) {

  }

  ngOnInit() {
    console.log(this.API);
    // this.getAlbums();
    this.userName = this.API.userAlias;
    this.API.getAlbums()
      .subscribe((res) => {
        console.log(res);
        this.albums = res.data;
        // console.log('Albums', this.albums);
      })
  }

  // getAlbums() {
  //   let params = {
  //     show_private: true,
  //     image_limit: 1
  //   };
  //   this.API.getAlbums(params)
  //     .subscribe((res) => {
  //       this.albums = res.result.albums;
  //       console.log('Albums', this.albums);
  //     })
  // }

  // openAlbum(album) {
  //   this.navCtrl.push(AlbumPage, {
  //     album: album
  //   });
  // }

  openAlbum(album) {
    this.navCtrl.push(AlbumPage, {
      album: album
    });
  }

}
