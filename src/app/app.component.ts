import { Component, ViewChild, ViewChildren, QueryList, HostListener, AfterViewInit } from '@angular/core';
import { NumButton, Display, CallButton, BackButton } from './parts/parts.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'telapp2022-katsumata';

  @ViewChildren(NumButton) numButtons!: QueryList<NumButton>;
  @ViewChild(Display) display!: Display;
  @ViewChild(BackButton) backButton!: BackButton;
  @ViewChild(CallButton) callButton!: CallButton;

  buttons: { [key: string]: NumButton | BackButton } = {};

  inputs: string[] = [];

  enableCallButton: boolean = false;
  showWarnMessage: boolean = false;


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const key: string = event.key as string;
    if (key in this.buttons) {
      this.buttons[key].click();
    }
  }

  ngAfterViewInit() {
    this.buttons = {};
    this.numButtons.forEach((button: NumButton) => {
      this.buttons[button.value + ""] = button;
      button.btnClick.subscribe(value => this.onButtonClick(value));
    });

    this.buttons[this.backButton.value] = this.backButton;
    this.backButton.btnClick.subscribe(value => this.onButtonClick(value));
    this.backButton.btnLongClick.subscribe(value => this.onButtonClick(value));
    this.callButton.btnClick.subscribe(value => this.onCallButtonClick(value));
  }
  onCallButtonClick(value: any) {

    console.log(`call`, this.inputs);
  }

  onButtonClick(value: any) {

    switch(value) {
      case "Backspace":
        this.inputs.pop();
        break;

      case "LongBackspace":
        while(this.inputs.length > 0) {
          this.inputs.pop();
        }
        break;

      default:
        this.inputs.push(value);
        break;
    }

    // Is the valid phone number?
    const phoneNumber = this.inputs.join("");
    this.display.value = phoneNumber;

    const containSeparators: boolean = /^\d+\-\d+\-\d{4}$/.test(this.display.value);
    console.log(containSeparators, this.display.value);

    this.enableCallButton =  /^1(04|13|15|17|19|77|59|89|10|16|18|71|36|88)$/.test(phoneNumber) ||
                              containSeparators && (
                                /^0[5789]0\d{8}$/.test(phoneNumber) ||
                                /^0[^0]{2}\d{7}$/.test(phoneNumber));

    this.showWarnMessage = !this.enableCallButton &&
                            (/[\#\*]/.test(phoneNumber) ||
                            /^1/.test(phoneNumber) && phoneNumber.length > 3 ||
                            /^0[5789]0\d{8}$/.test(phoneNumber) && phoneNumber.length > 11 ||
                            /^0[^0]{2}\d{7}$/.test(phoneNumber) && phoneNumber.length > 10 ||
                            /^[^01]/.test(phoneNumber));
  }

}
