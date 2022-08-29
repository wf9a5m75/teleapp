import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'num-button',
  templateUrl: './num-button.component.html',
  styleUrls: ['./num-button.component.scss']
})
export class NumButton {

  bgColor: string = "";


  @Input()
  value: string | number | undefined = "0";

  @Output()
  btnClick: EventEmitter<string | number | undefined> = new EventEmitter<string | number | undefined>();

  click(): void {
    this.btnClick.emit(this.value);
    this.bgColor = "click";
    setTimeout(() => {
      this.bgColor = "";
    }, 100);
  }
}
