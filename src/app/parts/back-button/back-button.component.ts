import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButton {

  bgColor: string = "";

  value: string = "Backspace";

  touchStartTime: number = 0;

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  btnLongClick: EventEmitter<string> = new EventEmitter<string>();

  mousedown(): void {
    this.touchStartTime = Date.now();
    this.bgColor = "click";
  }

  mouseup(): void {
    this.bgColor = "";
    if (Date.now() - this.touchStartTime >= 1500) {
      this.btnLongClick.emit("LongBackspace");
    } else {
      this.btnClick.emit("Backspace");
    }
    this.touchStartTime = 0;
  }
  touchcancel(): void {
    this.bgColor = "";
    this.touchStartTime = 0;
  }

  click(): void {
    this.mousedown();
    setTimeout(() => this.mouseup(), 100);
  }
}
