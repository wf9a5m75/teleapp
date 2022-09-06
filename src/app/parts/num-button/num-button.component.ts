import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'num-button',
  templateUrl: './num-button.component.html',
  styleUrls: ['./num-button.component.scss']
})
export class NumButton {

  bgColor: string = "";
  _enable: boolean = false;


  @Input()
  value: string | number | undefined = "0";

  @Output()
  btnClick: EventEmitter<string | number | undefined> = new EventEmitter<string | number | undefined>();

  click(): void {
    if (!this._enable) {
      return;
    }

    // ダブルクリックを防ぐため、クリック処理中は入力を受け付けない
    this._enable = false;
    this.btnClick.emit(this.value);
    this.bgColor = "click";

    setTimeout(() => {
      this._enable = true;
      this.bgColor = "";
    }, 100);
  }

  @Input()
  public get enable(): boolean {
    return this._enable;
  }

  public set enable(value: boolean) {
    this.bgColor = value ? "" : "disabled";
    this._enable = value;
  }
}
