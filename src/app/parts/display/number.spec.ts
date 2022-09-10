import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Display } from './display.component';
import { LineTransformer } from './line-transformer';

describe('電話番号のテスト', () => {
  let component: Display;
  let fixture: ComponentFixture<Display>;
  const testNumbers: string[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Display ]
    })
    .compileComponents();

    const ts = new TransformStream(new LineTransformer());
    const result: Response = await fetch("./assets/large-test-numbers.txt");
    // const result: Response = await fetch("./assets/small-test-numbers.txt");
    const rs = result.body;
    // Apply our Transformer on the ReadableStream to create a stream of strings
    const lineStream = rs!.pipeThrough(ts);
    // Read the stream of strings
    const reader = lineStream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break
      }

      testNumbers.push(value);
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Display);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('設定された電話番号に従って、正しく書式表示されるか(large-test-numbers.txt)', () => {
    const total: number = testNumbers.length;
    let pass: number = 0;

    testNumbers.forEach((expectVal: string) => {
      const unformatted = expectVal.replace(/\-/g, "");
      const result = component.formatNumber(unformatted);
      pass += (result === expectVal) ? 1 : 0;
      if (result !== expectVal) {
        console.log(result, expectVal);
      }
    });
    // console.log(`pass:${pass}, fail: ${total - pass}`);
    expect(~~((pass / total) * 100)).toBe(100);
  });

});
