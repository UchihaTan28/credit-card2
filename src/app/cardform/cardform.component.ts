import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CardModel, FocusedElement } from '../models/schema';

@Component({
  selector: 'app-cardform',
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.scss']
})
export class CardformComponent implements OnInit {

  @Input() chipImgPath: string;
  @Input() logoImgPath: string ;
  @Input() backBgImgPath: string ;
  @Input() frontBgImgPath: string ;
  @Input() defaultCardNumber: string;
  @Input() maskedCardNumber : string;
  @Output() submitEvent = new EventEmitter<CardModel>();
  @ViewChild('cardNumberInput', { static: false }) cardNumberInputViewChild: ElementRef ;
  constructor() { }
  cardModel: CardModel = { cardNumber: '', cardName: '', expMonth: '', expYear: '', cvv: '' };
  
  displayed_cnumber = this.cardModel.cardNumber; 
  cvv_displayed = this.cardModel.cvv; 
  cardNoId = 'cardNoId';
  cardNameId = 'cardNameId';
  monthSelect = 'monthSelect';
  minCardYr = new Date().getFullYear();
  yrSelectId = 'yrSelectId';
  cardCvvId = 'cardCvvId';
  cardNumberMaxLength = 19;
  focusedElement: FocusedElement ;
  cardNumberFormatArray: string[] ;

  ngOnInit(): void {
   
    this.cardNumberMaxLength = this.defaultCardNumber.length;
    this.cardNumberFormatArray = this.defaultCardNumber.split('');
  }

  onCardNoChange($event:any): void {
    let cursorPosStart = $event.srcElement.selectionStart;
    let cursorPosEnd = $event.srcElement.selectionEnd;
    let processedCardNumber: string = $event.target.value;
    const newValues: string[] = [];
    const letterRegex = new RegExp('[^0-9]');
    const isCursorAtTheEnd = cursorPosEnd === processedCardNumber.length;
    const cardNumWithoutSpaceAsArray = processedCardNumber.replace(/ /g, '').split('');
    this.cardNumberFormatArray.forEach((format) => {
      if (cardNumWithoutSpaceAsArray.length > 0) {
        if (format === '#') {
          let character: string;
          let isNumber: boolean;
          
          do {
            character = cardNumWithoutSpaceAsArray.shift()!;
            isNumber = !(letterRegex.test(character));
            if (isNumber) {
              newValues.push(character);
            } else { // don't move the cursor, if a letter is removed
              cursorPosEnd--;
              cursorPosStart--;
            }
          } while (!isNumber && character !== undefined); // find next one
        } else if (format === ' ') {
          newValues.push(' ');
        }
      }
    });
    processedCardNumber = newValues.join('').trim();
    this.displayed_cnumber = processedCardNumber;
    this.cardModel.cardNumber = processedCardNumber;
    $event.target.value = processedCardNumber; 
    if (!isCursorAtTheEnd) { 
      $event.srcElement.selectionEnd = cursorPosEnd;
      $event.srcElement.selectionStart = cursorPosStart;
    }
  }

  onCVVChange(event:any): void {
    this.cardModel.cvv = event.target.value.replace(/[^0-9]*/g, '');
    this.cvv_displayed = this.cardModel.cvv;
    event.target.value = this.cardModel.cvv;
  }
  onCardNoFocus(): void {
    this.unMaskCardNumber();
    this.focusedElement = FocusedElement.CardNumber;
  }
 

  onCNameFocus(): void {
    this.focusedElement = FocusedElement.CardName;
  }

  onDateFocus(): void {
    this.focusedElement = FocusedElement.ExpDate;
  }

  onCVVFocus(): void {
    this.unMaskCvv();
    this.focusedElement = FocusedElement.CVV;
  }

  onBlur(): void {
    this.focusedElement = 0;
  }

  onCardNoBlur(): void {
    this.maskCardNumber();
    this.onBlur();
  }

  onCVVBlur(): void {
    this.maskCvv();
    this.onBlur();
  }

  onCNameKeyPress($event:any): boolean {
    return (($event.charCode >= 65 && $event.charCode <= 90) ||
      ($event.charCode >= 97 && $event.charCode <= 122) || ($event.charCode === 32));
  }
  onYrChange(): void {
    if (this.cardModel.expYear === this.minCardYr.toString()) {
      this.cardModel.expMonth = '';
    }
  }

  minCardMonth(): number {
    if (this.cardModel.expYear === this.minCardYr.toString()) {
      return new Date().getMonth() + 1;
    } else {
      return 1;
    }
  }
  generateMonth(index: number): string {
    return index < 10 ? `0${index}` : index.toString();
  }
  private maskCardNumber(): void {
    this.cardModel.cardNumber = this.displayed_cnumber;
    const arr = this.displayed_cnumber.split('');
    arr.forEach((element, idx) => {
      if (this.maskedCardNumber[idx] === '*') {
        arr[idx] = '*';
      }
    });
    this.displayed_cnumber = arr.join('');
  }

  private unMaskCardNumber(): void {
    this.displayed_cnumber = this.cardModel.cardNumber;
  }

  private unMaskCvv(): void {
    this.cvv_displayed = this.cardModel.cvv;
  }

  private maskCvv(): void {
    this.cvv_displayed= new Array(this.cardModel.cvv.length + 1).join('*');
  }

  

  
  
 

  onSubmitClick() {
    this.submitEvent.emit(this.cardModel);
  }

}
