import { Component, ElementRef, Input } from '@angular/core';
import { CoefficientService } from 'src/services/coefficient/coefficient.service';
import { CurrencyService } from 'src/services/currency/currency.service';

interface Product {
  image: string;
  title: string;
  description: string;
  price: number;
  basePrice: number;
  weight: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  currency = '';
  coefficient = 0;

  setCurrency(currency: string) {
    this.currency = currency;
  }

  setCoefficient(coefficient: number) {
    this.coefficient = coefficient;
  }

  ngOnInit(): void {
    this.currencyService.currency$.subscribe((currency) => this.setCurrency(currency));
    this.coefficientService.coefficient$.subscribe((coefficient) => this.setCoefficient(coefficient));
  }

  changeCurrency() {
    this.coefficientService.setCoefficient(this.currency);
  }

  @Input() scrollTo($event: Event) {};

  constructor(
    private readonly currencyService: CurrencyService,
    private readonly coefficientService: CoefficientService,
  ) {}
}
