import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallButton } from './call-button.component';

describe('CallButtonComponent', () => {
  let component: CallButton;
  let fixture: ComponentFixture<CallButton>;
  let svgElement: SVGElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallButton ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CallButton);
    component = fixture.componentInstance;
    const nativeElement = fixture.nativeElement;
    svgElement = nativeElement.querySelector('svg');
    fixture.detectChanges();
  });

  it('インスタンスが作成されるか', () => {
    expect(component).toBeTruthy();
  });


  it ('enable/disableを切り替えたとき、ボタンの色が変わるか', () => {
    // ---------------------------------------------------------
    // enable = false のとき、.disabled CSSクラスを持っているはず
    // ---------------------------------------------------------
    component.enable = false;
    // 変化を検出する
    fixture.detectChanges();
    expect(svgElement.classList.contains('disabled')).toBe(true);

    // ---------------------------------------------------------
    // enable = true のとき、.disabled CSSクラスを持っていないはず
    // ---------------------------------------------------------
    component.enable = true;
    fixture.detectChanges();
    expect(svgElement.classList.contains('disabled')).toBe(false);

  });

  it ('ボタンを押したら、設定された電話番号をアラートダイアログで表示するか', () => {
    // ---------------------------------------------------------
    // AppComponent側で alert() を表示する実装のため、
    // このユニットテストでは、btnClick(call) イベントが発生したら良しとする
    // ---------------------------------------------------------

    const btnClickSpy = spyOn(component.btnClick, 'emit');
    btnClickSpy.calls.reset();

    component.enable = true;
    // <button>をクリックする
    svgElement.dispatchEvent(new MouseEvent('click'));

    expect(btnClickSpy).toHaveBeenCalledWith('Call');

  });
});
