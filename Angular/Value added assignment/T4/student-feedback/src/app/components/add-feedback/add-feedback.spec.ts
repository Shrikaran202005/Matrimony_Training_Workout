import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedback } from './add-feedback.component';

describe('AddFeedback', () => {
  let component: AddFeedback;
  let fixture: ComponentFixture<AddFeedback>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFeedback],
    }).compileComponents();

    fixture = TestBed.createComponent(AddFeedback);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
