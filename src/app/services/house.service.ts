import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService extends DataService {

  constructor(http: HttpClient) {
    super('https://smarthousex.herokuapp.com/house', http);
   }
}
