import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class APIService {
  apiUrl: string = 'https://api.flickr.com/services';
  apiKey = '0977e5f2be8a34b77c214f27ac500dfc';
  sercetKey = '3165870e2c7ab5f6';
  constructor(http:Http) {
  }

}
