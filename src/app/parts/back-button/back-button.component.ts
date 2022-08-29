import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButton {

  bgColor: string = "";

  value: string = "Backspace";

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter<string>();

  click(): void {
    this.btnClick.emit("Backspace");
    this.bgColor = "click";
    setTimeout(() => {
      this.bgColor = "";
    }, 100);
  }
}
