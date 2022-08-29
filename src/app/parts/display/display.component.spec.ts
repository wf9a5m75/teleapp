import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Display } from './display.component';
import { LineTransformer } from './line-transformer';

fdescribe('DisplayComponent', () => {
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

  it('should return the formatted number', () => {
    testNumbers.forEach((expectVal: string) => {
      const unformatted = expectVal.replace(/\-/g, "");
      const result = component.formatNumber(unformatted);

      expect(result).toBe(expectVal);
    });
  });
});
