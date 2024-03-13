import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridEvalComponent } from './grid-eval.component';

describe('GridEvalComponent', () => {
  let component: GridEvalComponent;
  let fixture: ComponentFixture<GridEvalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridEvalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
