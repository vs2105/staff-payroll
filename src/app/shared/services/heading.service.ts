import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadingService {

  heading$: BehaviorSubject<string> = new BehaviorSubject<string>('Dashboard')
  constructor() { }


}
