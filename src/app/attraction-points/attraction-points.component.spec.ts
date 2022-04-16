import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionPointsComponent } from './attraction-points.component';

describe('AttractionPointsComponent', () => {
  let component: AttractionPointsComponent;
  let fixture: ComponentFixture<AttractionPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttractionPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttractionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
