import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CurrencyService } from '../currency/currency.service';

interface CurrencyData {
  [index: string]: {
    currency: string;
    coefficient: number;
  };
}

@Injectable({
  providedIn: 'root'
})

export class CoefficientService {
  currencyData: CurrencyData = {
    '$': {
      currency: '₽',
      coefficient: 80
    },
    '₽': {
      currency: 'BYN',
      coefficient: 3
    },
    'BYN': {
      currency: '€',
      coefficient: .9
    },
    '€': {
      currency: '¥',
      coefficient: 6.9
    },
    '¥': {
      currency: '$',
      coefficient: 1
    },
  };

  public coefficient$ = new BehaviorSubject<number>(1);

  public setCoefficient(currency = '$') {
    this.coefficient$.next(this.currencyData[currency].coefficient || 1);
    this.currencyService.setCurrency(this.currencyData[currency].currency || '$');
  }

  ngOnInit(): void {
    this.currencyService.currency$.subscribe((currency) => this.setCoefficient(currency));
  }

  constructor(
    private readonly currencyService: CurrencyService,
  ) {}
}
