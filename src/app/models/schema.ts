export interface CardModel
{
    expMonth: string;
    expYear: string;
    cardName:string;
    cardNumber:string;
    cvv:string;
}
export interface CardLabel {
    mm: string;
    yy: string;
    cardHolder: string;
    fullName: string;
    expires: string;
    }
export enum FocusedElement {
    CardNumber,
    CardName,
    ExpDate,
    CVV
}

export interface FormLabel {
    cardNumber: string;
    cardName: string;
    expDate: string;
    expMonth: string;
    expYear: string;
    submitButton: string;
    cvv: string; 
  }



    export enum DefaultComponentLabels {
        FORM_CNUMBER = 'Card Number',
        FORM_CHOLDER_NAME = 'Card Holder Name',
        FORM_EXP_DATE = 'Expiration Date',
        FORM_EXP_MONTH = 'Month',
        FORM_EXP_YR = 'Year',
        FORM_CVV = 'CVV',
        CARD_EXPIRES = 'Expires',
        CARD_EXP_YR_FORMAT = 'YY',
        CARD_EXP_MONTH_FORMAT = 'MM',
        CARD_HOLDER_NAME = 'Card Holder',
        CARD_FULL_NAME = 'Full Name',
        FORM_SUBMIT_BUTTON = 'Submit'
      }