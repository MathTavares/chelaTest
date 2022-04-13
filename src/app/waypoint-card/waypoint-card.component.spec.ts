import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointCardComponent } from './waypoint-card.component';

describe('WaypointCardComponent', () => {
  let component: WaypointCardComponent;
  let fixture: ComponentFixture<WaypointCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
