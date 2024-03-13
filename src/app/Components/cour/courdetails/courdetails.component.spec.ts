import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourdetailsComponent } from './courdetails.component';

describe('CourdetailsComponent', () => {
  let component: CourdetailsComponent;
  let fixture: ComponentFixture<CourdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
