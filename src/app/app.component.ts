import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoefficientService } from 'src/services/coefficient/coefficient.service';
import { CurrencyService } from 'src/services/currency/currency.service';
import { AppService, Product } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  currency = '';
  coefficient = 0;
  popupIsOpened = false;
  isError = false;
  name: string = '';
  orderList: Array<string> = [];
  massage: string = '';

  setCurrency(currency: string) {
    this.currency = currency;
  }

  setCoefficient(coefficient: number) {
    this.coefficient = coefficient;
  }

  ngOnInit(): void {
    this.currencyService.currency$.subscribe((currency) => this.setCurrency(currency));
    this.coefficientService.coefficient$.subscribe((coefficient) => this.setCoefficient(coefficient));

    this.appService.getProductsData()
      .subscribe({
          next: (data) => this.productsData = data,
          error: (error) => console.log(error.message),
        }
      )
  }

  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })
  
  public productsData: any = [
    {
      image: './assets/images/burgers/1.png',
      title: 'Бургер чеддер & бекон',
      text: `Котлета из говядины криспи, булочка, томат, сыр Чеддер, грудинка, лук красный, салат айсбер, майонез, кетчуп, сырный соус`,
      price: 8,
      grams: 360,
    },
    {
      image: './assets/images/burgers/2.png',
      title: 'BBQ с беконом и курицей',
      text: `Булочка бриошь с кунжутом, куриная котлета, сыр чеддер, томат, огурец маринованный, лук маринованный, салат Ромен, бекон, соус BBQ`,
      price: 7,
      grams: 390,
    },
    {
      image: './assets/images/burgers/3.png',
      title: 'Дабл биф бургер',
      text: `Две говяжьи котлеты, сыр чеддер, салат романо, маринованные огурцы, свежий томат, бекон, красный лук, соус бургер, горчица`,
      price: 10,
      grams: 420,
    },
    {
      image: './assets/images/burgers/4.png',
      title: 'Баварский бургер',
      text: `Булочка для бургера, говяжья котлета, красный лук, сыр, охотничья колбаска, соус барбекю, соус сырный, салат айсберг`,
      price: 7,
      grams: 220,
    },
    {
      image: './assets/images/burgers/5.png',
      title: 'Бекон чизбургер',
      text: `Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, сыр, сырный соус, кетчуп, зелень`,
      price: 8,
      grams: 220,
    },
    {
      image: './assets/images/burgers/6.png',
      title: 'Индиана бургер',
      text: `Булочка для бургера, котлета куриная, грудинка, яйцо, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      price: 9,
      grams: 320,
    },
    {
      image: './assets/images/burgers/7.png',
      title: 'Вегги бургер',
      text: `Булочка для бургера, вегетарианская котлета, красный лук, сыр, свежий томат, соус барбекю, соус сырный, салат айсберг`,
      price: 8,
      grams: 280,
    },
    {
      image: './assets/images/burgers/8.png',
      title: 'Плаксивый Джо',
      text: `Булочка для бургера, говяжья котлета, грудинка, помидор, огурец маринованный, красный лук, сыр, перец халапеньо, кетчуп, зелень`,
      price: 7,
      grams: 380,
    },
    {
      image: './assets/images/burgers/9.png',
      title: 'Двойной чиз бургер',
      text: `Булочка для бургера, две говяжьи котлеты, двойной сыр чеддар, огурец маринованный, криспи лук, кетчуп, соус сырный, горчица, зелень`,
      price: 11,
      grams: 400,
    },
    {
      image: './assets/images/burgers/10.png',
      title: 'Фрешбургер',
      text: `Булочка для бургера, говяжья котлета, бекон, сыр чеддар, яйцо, салями, соус барбекю, соус сырный, салат айсберг, свежий томат`,
      price: 9,
      grams: 300,
    },
    {
      image: './assets/images/burgers/11.png',
      title: 'Цуккини бургер',
      text: `Булочка для бургера, вегетарианская котлета из нута, цуккини на гриле, помидор, огурец маринованный, сыр, горчичный соус, кетчуп, зелень`,
      price: 8,
      grams: 320,
    },
    {
      image: './assets/images/burgers/12.png',
      title: 'Двойной бургер чеддар',
      text: `Булочка для бургера, котлета говяжья, грудинка, красный лук, огурец маринованный, томат, кетчуп, двойной сыр чеддар, горчица, зелень`,
      price: 9,
      grams: 360,
    },
  ];
  
  public scrollTo($event: Event) {
    const target = document.querySelector(($event?.currentTarget as HTMLElement).getAttribute('href') || '');
    
    target?.scrollIntoView({behavior: 'smooth'});
  }

  addToOrder(target: HTMLElement, product: Product) {
    if (product) {
      const order = this.form.get('order')?.value;

      this.form.patchValue({order: `${order ? `${order}, ` : ''}${product.title} (${product.price * this.coefficient} ${this.currency})`});
    }
    
    target.scrollIntoView({behavior: 'smooth'});
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendData(this.form.value)
        .subscribe({
          next: (response: any) => {
            console.log(response);
            
            this.popupIsOpened = true;
            this.massage = response.message;
            this.name = this.form.value.name || '';
            this.orderList = this.form.value.order?.split(/\s*\,\s*/g) || [];
            this.form.reset();
          },
          error: (response) => {
            this.isError = true;
            this.massage = response.message
          },
        }); 
    }
  }

  closePopup(overlay: HTMLElement, popup: HTMLElement) {
    this.popupIsOpened = false;
    this.isError = false;
  }

  constructor(
    private fb: FormBuilder,
    private readonly coefficientService: CoefficientService,
    private readonly currencyService: CurrencyService,
    private appService: AppService,
  ) {}
}


