import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { trigger, transition, state, animate, style } from '@angular/animations';
import { CardModel, FocusedElement } from '../models/schema';


@Component({
  selector: 'app-cardarea',
  templateUrl: './cardarea.component.html',
  styleUrls: ['./cardarea.component.scss'],
  animations:[trigger('slideFadeUp', [
    state('in', style({ transform: 'translateY(0)' })),
    transition(':enter', [
        style({ transform: 'translateY(15px)', opacity: 0 }),
        animate('0.3s ease-in-out')
    ])
]),
trigger('cardHolderFadeRight', [
    state('in', style({ transform: 'translate(0,0)' })),
    transition(':enter', [
        style({ transform: 'translateX(10px) rotate(45deg)', opacity: 0, position: 'absolute' }),
        animate('0.3s ease-in-out')
    ]),
]),
trigger('cardHolderFadeUp', [
    state('in', style({ transform: 'translate(0,0)' })),
    transition(':enter', [
        style({ transform: 'translateY(15px)', opacity: 0, position: 'absolute' }),
        animate('0.3s ease-in-out')
    ]),
])]
})
export class CardareaComponent implements OnInit {

 
  constructor() { }
  @ViewChild('cardNumber', { static: false }) cardNumberViewChild: ElementRef ;
  @ViewChild('cardName', { static: false }) cardNameViewChild: ElementRef ;
  @ViewChild('expireDate', { static: false }) expireDateViewChild: ElementRef ;

  @Input() cardModel: CardModel ;
  @Input() chipImgPath: string;
  @Input() logoImgPath: string;
  @Input() backBgImgPath: string;
  @Input() frontBgImgPath: string;
  @Input() defaultCardNumber: string ;
  @Input() displayed_cnumber: string;
  @Input() focusedElement: FocusedElement ;

  

  currentCNoPH: string[] ;
  cardHolderNamePH: string[] ;
  focusStyle:any = null;
  FocusedElement = FocusedElement; 
  currentFocusedElement: any;


  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event:any) {
      if (this.currentFocusedElement) {
          setTimeout(() => {
              this.focusStyle = {
                  width: `${this.currentFocusedElement.offsetWidth}px`,
                  height: `${this.currentFocusedElement.offsetHeight}px`,
                  transition: 'none',
                  transform: `translateX(${this.currentFocusedElement.offsetLeft}px)
                  translateY(${this.currentFocusedElement.offsetTop}px)`
              };
          }, 60); 
      }
  }

  ngOnInit(): void {
    this.currentCNoPH = this.defaultCardNumber.split('');
    this.cardHolderNamePH = Array(30).fill(''); 
  }
  getIsNoMasked(idx: number): boolean {
    return this.displayed_cnumber[idx] === '*';
}

ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
        if (propName === 'focusedElement') {
            if (changes[propName].currentValue != null) {
                if (changes[propName].currentValue === FocusedElement.CardNumber) {
                    this.currentFocusedElement = this.cardNumberViewChild.nativeElement;
                } else if (changes[propName].currentValue === FocusedElement.CardName) {
                    this.currentFocusedElement = this.cardNameViewChild.nativeElement;
                } else if (changes[propName].currentValue === FocusedElement.ExpDate) {
                    this.currentFocusedElement = this.expireDateViewChild.nativeElement;
                }
                if (this.currentFocusedElement) {
                    this.focusStyle = {
                        width: `${this.currentFocusedElement.offsetWidth}px`,
                        height: `${this.currentFocusedElement.offsetHeight}px`,
                        transform: `translateX(${this.currentFocusedElement.offsetLeft}px) translateY(${this.currentFocusedElement.offsetTop}px)`
                    };
                }
            } else {
                this.focusStyle = null;
            }
        }
    }
}

}
