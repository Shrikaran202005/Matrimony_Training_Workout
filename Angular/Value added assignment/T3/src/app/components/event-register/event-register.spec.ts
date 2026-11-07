import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegister } from './event-register';

describe('EventRegister', () => {
  let component: EventRegister;
  let fixture: ComponentFixture<EventRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(EventRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
