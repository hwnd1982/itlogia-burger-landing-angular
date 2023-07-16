import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
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
  
  popupIsOpened = false

  form = this.fb.group({
    burgers: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })
  
  public productsData: Product[] = [
    {
      image: '1.png',
      title: 'Бургер чеддер & бекон',
      description: `Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус`,
      price: 8,
      basePrice: 8,
      weight: 360,
    },
    {
      image: '2.png',
      title: 'BBQ с беконом и курицей',
      description: `Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ`,
      price: 7,
      basePrice: 7,
      weight: 390,
    },
    {
      image: '3.png',
      title: 'Дабл биф бургер',
      description: `Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица`,
      price: 10,
      basePrice: 10,
      weight: 420,
    },
    {
      image: '4.png',
      title: 'Баварский бургер',
      description: `Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг`,
      price: 7,
      basePrice: 7,
      weight: 220,
    },
    {
      image: '5.png',
      title: 'Бекон чизбургер',
      description: `Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень`,
      price: 8,
      basePrice: 8,
      weight: 220,
    },
    {
      image: '6.png',
      title: 'Индиана бургер',
      description: `Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      price: 9,
      basePrice: 9,
      weight: 320,
    },
    {
      image: '7.png',
      title: 'Вегги бургер',
      description: `Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг`,
      price: 8,
      basePrice: 8,
      weight: 280,
    },
    {
      image: '8.png',
      title: 'Плаксивый Джо',
      description: `Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень`,
      price: 7,
      basePrice: 7,
      weight: 380,
    },
    {
      image: '9.png',
      title: 'Двойной чиз бургер',
      description: `Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      price: 11,
      basePrice: 11,
      weight: 400,
    },
    {
      image: '10.png',
      title: 'Фрешбургер',
      description: `Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат`,
      price: 9,
      basePrice: 9,
      weight: 300,
    },
    {
      image: '11.png',
      title: 'Цуккини бургер',
      description: `Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень`,
      price: 8,
      basePrice: 8,
      weight: 320,
    },
    {
      image: '12.png',
      title: 'Двойной бургер чеддар',
      description: `Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень`,
      price: 9,
      basePrice: 9,
      weight: 360,
    },
  ];
  
  public scrollTo(target: HTMLElement) {
    target.scrollIntoView({behavior: 'smooth'});
  }

  addToOrder(target: HTMLElement, product: { image: string; title: string; description: string; price: number; basePrice: number; weight: number; }) {
    if (product) {
      this.form.patchValue({burgers: `${product.title} (${product.price} ${this.currency})`});
    }
    
    target.scrollIntoView({behavior: 'smooth'});
  }

  confirmOrder(overlay: HTMLElement, popup: HTMLElement, popupName: HTMLElement, popupOrderList:HTMLElement) {
    if (this.form.valid) {
      overlay.classList.add('_active');
      popup.classList.add('_show');
      popupName.textContent = this.form.value.name || '';
      popupOrderList.innerHTML = this.form.value.burgers?.split(/\s*\,\s*/g).map((item:string) => `<li class="popup__order-item">${item}</li>`).join(' ') || '';
      this.form.reset(); 
    }
  }

  closePopup(overlay: HTMLElement, popup: HTMLElement) {
    overlay.classList.remove('_active');
    popup.classList.remove('_show');
  }

  constructor(
    private fb: FormBuilder,
    private readonly coefficientService: CoefficientService,
    private readonly currencyService: CurrencyService,
  ) {}
}


