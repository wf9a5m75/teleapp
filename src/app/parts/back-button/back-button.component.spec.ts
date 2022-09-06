import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButton } from './back-button.component';

describe('BackButtonComponent', () => {
  let component: BackButton;
  let fixture: ComponentFixture<BackButton>;
  let svgElement: SVGElement;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackButton ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(BackButton);
    component = fixture.componentInstance;

    // テストフレームワークに変化が起こる旨を通知する
    fixture.detectChanges();

    // AngularがHTMLをレンダリングするまで待つ
    await fixture.whenStable();

    const nativeElement = fixture.nativeElement;
    svgElement = nativeElement.querySelector('svg');
  });

  // beforeEach(function() {
  //   jasmine.clock().install();
  // });
  //
  // afterEach(function() {
  //   jasmine.clock().uninstall();
  // });

  const wait = (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };

  it('インスタンスが作成されるか', () => {
    expect(component).toBeTruthy();
  });

  it ('1回押したら、btnClickイベントが1回だけ発生するか', async () => {

    const btnClickSpy = spyOn(component.btnClick, 'emit');
    btnClickSpy.calls.reset();

    component.enable = true;

    for (let i = 0; i < 3; i++) {
      // テストフレームワークに変化が起こる旨を通知する
      fixture.detectChanges();

      // <button>をクリックする
      svgElement.dispatchEvent(new MouseEvent('mousedown'));

      // AngularがHTMLをレンダリングするまで待つ
      await fixture.whenStable();
      await wait(150);

      // テストフレームワークに変化が起こる旨を通知する
      fixture.detectChanges();

      svgElement.dispatchEvent(new MouseEvent('mouseup'));
      // AngularがHTMLをレンダリングするまで待つ
      await fixture.whenStable();
      await wait(150);

      expect(btnClickSpy).toHaveBeenCalledTimes(i + 1);
      expect(btnClickSpy).toHaveBeenCalledWith('Backspace');
    }

  });

  it ('長押ししたら、btnLongClickイベントが発生するか', async () => {

    const btnClickSpy = spyOn(component.btnLongClick, 'emit');
    btnClickSpy.calls.reset();

    component.enable = true;

    // テストフレームワークに変化が起こる旨を通知する
    fixture.detectChanges();

    // <button>をクリックする
    svgElement.dispatchEvent(new MouseEvent('mousedown'));

    // AngularがHTMLをレンダリングするまで待つ
    await fixture.whenStable();
    await wait(600);

    // テストフレームワークに変化が起こる旨を通知する
    fixture.detectChanges();

    svgElement.dispatchEvent(new MouseEvent('mouseup'));
    // AngularがHTMLをレンダリングするまで待つ
    await fixture.whenStable();
    await wait(150);

    expect(btnClickSpy).toHaveBeenCalledWith('LongBackspace');

  });
});
