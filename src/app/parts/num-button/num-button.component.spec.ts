import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumButton } from './num-button.component';

describe('NumButtonComponent', () => {
  let component: NumButton;
  let fixture: ComponentFixture<NumButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumButton ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
