import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Display } from './display.component';
import { LineTransformer } from './line-transformer';

describe('DisplayComponent', () => {
  let component: Display;
  let fixture: ComponentFixture<Display>;
  const testNumbers: string[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Display ]
    })
    .compileComponents();

    const ts = new TransformStream(new LineTransformer());
    const result: Response = await fetch("./assets/test-numbers.txt");
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

  it('設定された電話番号に従って、正しく書式表示されるか', () => {
    testNumbers.forEach((expectVal: string) => {
      const unformatted = expectVal.replace(/\-/g, "");
      const result = component.formatNumber(unformatted);

      expect(result).toBe(expectVal);
    });
  });


  it('番号の途中に"#", "*" を含んだ場合、以降はハイフンを表示しないか', () => {
    // 正しいことの確認
    expect(component.formatNumber('0559261121')).toBe('055-926-1121');

    // # を挿入した以降はハイフンが含まれないことの確認
    expect(component.formatNumber('05#59261121')).toBe('05#59261121');
    expect(component.formatNumber('05592#61121')).toBe('055-92#61121');
    expect(component.formatNumber('05592611#21')).toBe('055-926-11#21');
    expect(component.formatNumber('0559261121#333')).toBe('055-926-1121#333');
    // * を挿入した以降はハイフンが含まれないことの確認
    expect(component.formatNumber('05*59261121')).toBe('05*59261121');
    expect(component.formatNumber('05592*61121')).toBe('055-92*61121');
    expect(component.formatNumber('05592611*21')).toBe('055-926-11*21');
    expect(component.formatNumber('0559261121*333')).toBe('055-926-1121*333');
  });
});
