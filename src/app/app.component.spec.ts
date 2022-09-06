import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BackButton, CallButton, Display, NumButton } from './parts/parts.module';


describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let display: Display;
  let callButton: CallButton;
  let backButton: BackButton;
  let buttons: { [key: string]: NumButton };

  const wait = (ms: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };
  //
  // const clearInput = async () => {
  //   // すべて消す
  //   while(display.value.length > 0) {
  //     fixture.detectChanges();
  //     backButton.click();
  //     await fixture.whenStable();
  //     await wait(100);
  //   }
  // };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BackButton,
        CallButton,
        Display,
        NumButton
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    // テストフレームワークに変化が起こる旨を通知する
    fixture.detectChanges();

    // AngularがHTMLをレンダリングするまで待つ
    await fixture.whenStable();

    buttons = app.buttons;
    callButton = app.callButton;
    backButton = app.backButton;
    display = app.display;
  });

  // beforeEach(function() {
  //   jasmine.clock().install();
  // });
  //
  // afterEach(function() {
  //   jasmine.clock().uninstall();
  // });

  it('インスタンスが作成されるか', () => {
    expect(app).toBeTruthy();
  });

  it("入力した順序（バックボタンを含む）通りに電話番号が構成されるか", async () => {
    // clearInput();

    // 078-265-1111 と入力して、dispplay.value が同じになっているか
    const keys1 = ['0','7','8','2','6','5','1','1','1','1'];
    for (let i = 0; i < keys1.length; i++) {
      fixture.detectChanges();
      const key: string = keys1[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }

    expect(display.value).toBe("078-265-1111");

    // [backspace]で途中まで消す
    for (let i = 0; i < 8; i++) {
      fixture.detectChanges();
      backButton.click();
      await fixture.whenStable();
      await wait(100);
    }
    expect(display.value).toBe("07");

    const keys2 = ['4','9','6','3','0','0','0','0','#','1','2','3'];
    for (let i = 0; i < keys2.length; i++) {
      fixture.detectChanges();
      const key: string = keys2[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }
    expect(display.value).toBe("0749-63-0000#123");


  });

  it("無効な電話番号を入力されたとき、「無効な電話番号です」が表示されるか", async () => {
    // clearInput();

    const keys1 = ['1','1','9','#'];
    for (let i = 0; i < keys1.length; i++) {
      fixture.detectChanges();
      const key: string = keys1[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }
    expect(app.showWarnMessage).toBe(true);
  });

  it("有効な電話番号のとき、CallButtonが enable になるか", async () => {
    const alertSpy = spyOn(window, 'alert');
    alertSpy.calls.reset();

    // clearInput();

    const keys1 = ['0','7','8','2','6','5','1','1','1','1'];
    for (let i = 0; i < keys1.length; i++) {
      fixture.detectChanges();
      const key: string = keys1[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }
    fixture.detectChanges();
    await wait(100);
    await fixture.whenStable();
    callButton.click();

    fixture.detectChanges();
    await fixture.whenStable();
    await wait(100);
    expect(window.alert).toHaveBeenCalledWith('電話番号: 0782651111');
  });

  it("無効な電話番号のとき、CallButtonが disable になるか", async () => {
    const alertSpy = spyOn(window, 'alert');
    alertSpy.calls.reset();

    // clearInput();

    const keys1 = ['0','7','8','#','2','6','5','1','1','1','1'];
    for (let i = 0; i < keys1.length; i++) {
      fixture.detectChanges();
      const key: string = keys1[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }
    fixture.detectChanges();
    await wait(100);
    await fixture.whenStable();
    callButton.click();

    fixture.detectChanges();
    await fixture.whenStable();
    await wait(100);
    expect(window.alert).toHaveBeenCalledTimes(0);
  });

  it("無効な電話番号のとき、enableになるか", async () => {
    const alertSpy = spyOn(window, 'alert');
    alertSpy.calls.reset();

    // clearInput();

    const keys1 = ['0','7','8','#','2','6','5','1','1','1','1'];
    for (let i = 0; i < keys1.length; i++) {
      fixture.detectChanges();
      const key: string = keys1[i];
      buttons[key].click();
      await fixture.whenStable();
      await wait(100);
    }
    fixture.detectChanges();
    await wait(100);
    await fixture.whenStable();
    callButton.click();

    fixture.detectChanges();
    await fixture.whenStable();
    await wait(100);
    expect(window.alert).toHaveBeenCalledTimes(0);
  });
});
