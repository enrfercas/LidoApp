import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpiaggiaBookingComponent } from './spiaggia-booking.component';

describe('SpiaggiaBookingComponent', () => {
  let component: SpiaggiaBookingComponent;
  let fixture: ComponentFixture<SpiaggiaBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpiaggiaBookingComponent]
    });
    fixture = TestBed.createComponent(SpiaggiaBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
