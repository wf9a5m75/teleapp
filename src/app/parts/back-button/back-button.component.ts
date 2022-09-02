import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButton {

  bgColor: string = "";

  value: string = "Backspace";

  touchStartTime: number = 0;

  _enable: boolean = false;

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  btnLongClick: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public get enable(): boolean {
    return this._enable;
  }

  public set enable(value: boolean) {
    this.bgColor = value ? "" : "disabled";
    this._enable = value;
  }

  mousedown(): void {
    if (!this._enable) {
      return;
    }
    this.touchStartTime = Date.now();
    this.bgColor = "click";
  }

  mouseup(): void {
    if (!this._enable) {
      return;
    }
    this.bgColor = "";
    if (Date.now() - this.touchStartTime >= 1500) {
      this.btnLongClick.emit("LongBackspace");
    } else {
      this.btnClick.emit("Backspace");
    }
    this.touchStartTime = 0;
  }

  click(): void {
    if (!this._enable) {
      return;
    }
    this.mousedown();
    setTimeout(() => this.mouseup(), 100);
  }
}
