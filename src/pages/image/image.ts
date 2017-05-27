import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { APIService } from '../../services/API.service';

@Component({
  selector: 'page-image',
  templateUrl: 'image.html'
})
export class ImagePage implements OnInit {
  image: Object;

  constructor(private navCtrl: NavController,
              public params: NavParams,
              private API: APIService) {
  }

  ngOnInit() {
    this.image = this.params.data['image'];
  }

  goBack() {
    this.navCtrl.pop();
  }

}
