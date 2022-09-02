import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'call-button',
  templateUrl: './call-button.component.html',
  styleUrls: ['./call-button.component.scss']
})
export class CallButton {

  bgColor: string = "";
  _enabled: boolean = false;

  @Output()
  btnClick: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public get enabled(): boolean {
    return this._enabled;
  }

  public set enabled(value: boolean) {
    this.bgColor = value ? "" : "disabled";
    this._enabled = value;
  }

  click(): void {
    this.btnClick.emit("Call");
    this.bgColor = "click";
    setTimeout(() => {
      this.bgColor = "";
    }, 100);
  }

}
