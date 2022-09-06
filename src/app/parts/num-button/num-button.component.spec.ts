import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumButton } from './num-button.component';

describe('NumButtonComponent', () => {
  let component: NumButton;
  let fixture: ComponentFixture<NumButton>;
  let buttonElement: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumButton ]
    })
    .compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(NumButton);
    component = fixture.componentInstance;

    // テストフレームワークに変化が起こる旨を通知する
    fixture.detectChanges();

    // AngularがHTMLをレンダリングするまで待つ
    await fixture.whenStable();

    const nativeElement = fixture.nativeElement;
    buttonElement = nativeElement.querySelector('button');
  });


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

  it('ボタンが押されたとき、btnClickイベントが発生して、ボタンに設定された値が取得できるか', () => {
    component.enable = true;

    // ボタンにランダムな値を設定する
    const exepctValue: number = Date.now();
    component.value = exepctValue;

    // ---------------------------------------
    // EventEmitterのテスト方法
    // https://stackoverflow.com/a/35319780
    // ---------------------------------------
    const btnClickSpy = spyOn(component.btnClick, 'emit');
    btnClickSpy.calls.reset();

    // <button>をクリックする
    buttonElement.dispatchEvent(new Event('click'));

    // 変化を検出する
    fixture.detectChanges();

    // btnClickが発生し、設定した値を持つかどうか調べる
    expect(component.btnClick.emit).toHaveBeenCalledWith(exepctValue);
  });

  it ('enable/disableを切り替えたとき、ボタンの色が変わるか', () => {
    // ---------------------------------------------------------
    // enable = false のとき、.disabled CSSクラスを持っているはず
    // ---------------------------------------------------------
    component.enable = false;
    // 変化を検出する
    fixture.detectChanges();
    expect(buttonElement.classList.contains('disabled')).toBe(true);

    // ---------------------------------------------------------
    // enable = true のとき、.disabled CSSクラスを持っていないはず
    // ---------------------------------------------------------
    component.enable = true;
    fixture.detectChanges();
    expect(buttonElement.classList.contains('disabled')).toBe(false);

  });

  // TODO : うまく出来なかったので、要追加調査
  //
  // fit ('ボタンを長押ししても、イベントの発生は1回だけか', async () => {
  //
  //   const btnClickSpy = spyOn(component, 'click');
  //   btnClickSpy.calls.reset();
  //   console.log(buttonElement)
  //   buttonElement.addEventListener('mousedown', () => {
  //     console.log('mousedown');
  //   });
  //   buttonElement.addEventListener('mouseup', () => {
  //     console.log('mouseup');
  //   });
  //   buttonElement.addEventListener('click', () => {
  //     console.log('click');
  //   });
  //
  //   // <button>にmousedownイベントを送る
  //   fixture.detectChanges();
  //   buttonElement.dispatchEvent(new MouseEvent('mousedown', {
  //     clientX: 100,
  //     clientY: 100,
  //   }));
  //   await fixture.whenStable();
  //   await wait(200);
  //
  //   fixture.detectChanges();
  //   buttonElement.dispatchEvent(new MouseEvent('mouseup', {
  //     clientX: 100,
  //     clientY: 100,
  //   }));
  //   await fixture.whenStable();
  //   fixture.detectChanges();
  //   await wait(400);
  //
  //   expect(btnClickSpy).toHaveBeenCalledTimes(1);
  //
  // });


  it('ダブルクリックしても、イベントの発生は1回だけか', async () => {
    component.enable = true;

    // ボタンにランダムな値を設定する
    const exepctValue: number = Date.now();
    component.value = exepctValue;

    // ---------------------------------------
    // EventEmitterのテスト方法
    // https://stackoverflow.com/a/35319780
    // ---------------------------------------
    const btnClickSpy = spyOn(component.btnClick, 'emit');
    btnClickSpy.calls.reset();

    // <button>をクリックする
    buttonElement.dispatchEvent(new Event('click'));

    // 50ms待つ
    await wait(50);

    // <button>をクリックする
    buttonElement.dispatchEvent(new Event('click'));

    // 変化を検出する
    fixture.detectChanges();

    // btnClickが発生し、設定した値を持つかどうか調べる
    expect(btnClickSpy).toHaveBeenCalledWith(exepctValue);

    // 1回だけ呼び出されるか
    expect(btnClickSpy).toHaveBeenCalledTimes(1);
  });

  it('ダブルクリックよりも時間間隔を空けて連続してクリックした場合、連続してイベントが発生するか', async () => {
    component.enable = true;

    // ボタンにランダムな値を設定する
    const exepctValue: number = Date.now();
    component.value = exepctValue;

    // ---------------------------------------
    // EventEmitterのテスト方法
    // https://stackoverflow.com/a/35319780
    // ---------------------------------------
    const btnClickSpy = spyOn(component.btnClick, 'emit');
    btnClickSpy.calls.reset();

    for (let i = 0; i < 3; i++) {
      // <button>をクリックする
      buttonElement.dispatchEvent(new Event('click'));

      // 200ms待つ
      await wait(200);
    }

    // 3回呼び出されるか
    expect(btnClickSpy).toHaveBeenCalledTimes(3);
  });
});
