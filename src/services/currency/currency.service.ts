import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CurrencyService {
  public currency$ = new BehaviorSubject<string>('$');

	public setCurrency(currency: string) {
    this.currency$.next(currency); 
  }
}
