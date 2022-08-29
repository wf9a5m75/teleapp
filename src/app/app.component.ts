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

  buttons: { [key: string]: NumButton | BackButton } = {};

  inputs: string[] = [];

  constructor() {
  }

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
  }

  onButtonClick(value: any) {

    switch(value) {
      case "Backspace":
        this.inputs.pop();
        break;

      default:
        this.inputs.push(value);
        break;
    }
    console.log(this.inputs);
    this.display.value = this.inputs.join("");
  }
}
