import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'call-button',
  templateUrl: './call-button.component.html',
  styleUrls: ['./call-button.component.scss']
})
export class CallButton {

  bgColor: string = "";
  _enable: boolean = false;

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public get enable(): boolean {
    return this._enable;
  }

  public set enable(value: boolean) {
    this.bgColor = value ? "" : "disabled";
    this._enable = value;
  }

  click(): void {
    if (!this._enable) {
      return;
    }
    this.btnClick.emit("Call");
    this.bgColor = "click";
    setTimeout(() => {
      this.bgColor = "";
    }, 100);
  }

}
